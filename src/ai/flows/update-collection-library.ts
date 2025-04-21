// 'use server';
/**
 * @fileOverview This file defines a Genkit flow for updating a user's collection library by analyzing uploaded images or videos.
 *
 * - updateCollectionLibrary - A function that triggers the collection update flow.
 * - UpdateCollectionLibraryInput - The input type for the updateCollectionLibrary function.
 * - UpdateCollectionLibraryOutput - The return type for the updateCollectionLibrary function.
 */

'use server';

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getMediaDetails, MediaDetails} from '@/services/tmdb';

const UpdateCollectionLibraryInputSchema = z.object({
  mediaUrl: z.string().describe('The URL of the uploaded image or video.'),
  userId: z.string().describe('The ID of the authenticated user.'),
});
export type UpdateCollectionLibraryInput = z.infer<typeof UpdateCollectionLibraryInputSchema>;

const UpdateCollectionLibraryOutputSchema = z.object({
  shouldUpdate: z.boolean().describe('Whether the collection library should be updated.'),
  mediaDetails: z
    .object({
      title: z.string().describe('The title of the media item.'),
      overview: z.string().describe('A brief overview of the media item.'),
      posterUrl: z.string().describe('The URL of the poster image.'),
      genre: z.string().describe('The genre of the media item.'),
      platform: z.string().optional().describe('The platform of the game, if applicable.'),
    })
    .optional()
    .describe('Details of the media item to add to the library, if identified.'),
});
export type UpdateCollectionLibraryOutput = z.infer<typeof UpdateCollectionLibraryOutputSchema>;

export async function updateCollectionLibrary(input: UpdateCollectionLibraryInput): Promise<UpdateCollectionLibraryOutput> {
  return updateCollectionLibraryFlow(input);
}

const shouldUpdateCollection = ai.defineTool({
  name: 'shouldUpdateCollection',
  description: 'Determine if the collection library should be updated based on the analyzed media content.',
  inputSchema: z.object({
    mediaType: z.enum(['movie', 'game']).describe('The type of media (movie or game).'),
    mediaTitle: z.string().describe('The title of the media item.'),
  }),
  outputSchema: z.boolean(),
},
async input => {
    // This tool always returns true, the LLM can decide when to use it.
    return true;
  }
);

const analyzeMediaPrompt = ai.definePrompt({
  name: 'analyzeMediaPrompt',
  input: {
    schema: z.object({
      mediaUrl: z.string().describe('The URL of the uploaded image or video.'),
      userId: z.string().describe('The ID of the authenticated user.'),
    }),
  },
  output: {
    schema: z.object({
      mediaType: z.enum(['movie', 'game']).describe('The type of media (movie or game).'),
      mediaTitle: z.string().describe('The title of the media item.'),
    }),
  },
  prompt: `You are an AI assistant helping users update their collection library of movies and games.

  Analyze the uploaded media (image or video) at the following URL: {{mediaUrl}}

  Based on the content, determine the type of media (movie or game) and its title.
  Return the media type and title in the output schema.  The media type must be one of 'movie' or 'game'.
  If you cannot confidently determine the media type or title, return null values.

  The user's ID is: {{userId}}
  `,
  tools: [shouldUpdateCollection],
});

const updateCollectionLibraryFlow = ai.defineFlow<
  typeof UpdateCollectionLibraryInputSchema,
  typeof UpdateCollectionLibraryOutputSchema
>(
  {
    name: 'updateCollectionLibraryFlow',
    inputSchema: UpdateCollectionLibraryInputSchema,
    outputSchema: UpdateCollectionLibraryOutputSchema,
  },
  async input => {
    const {output} = await analyzeMediaPrompt(input);

    if (!output) {
      return {shouldUpdate: false};
    }

    const {mediaType, mediaTitle} = output;

    //Use the tool to decide whether to update the collection.
    const updateCollection = await shouldUpdateCollection({
      mediaType: mediaType,
      mediaTitle: mediaTitle,
    });

    if (!updateCollection) {
      return {shouldUpdate: false};
    }

    const mediaDetails = await getMediaDetails(mediaTitle, mediaType);

    return {shouldUpdate: true, mediaDetails};
  }
);
