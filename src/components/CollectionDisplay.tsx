
'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {getMediaDetails} from '@/services/tmdb';
import {useEffect, useState} from 'react';

export interface MediaItem {
  title: string;
  type: 'movie' | 'game';
}

const dummyData: MediaItem[] = [
  {title: 'The Shawshank Redemption', type: 'movie'},
  {title: 'The Last of Us Part II', type: 'game'},
  {title: 'Inception', type: 'movie'},
  {title: 'God of War Ragnarök', type: 'game'},
];

export function CollectionDisplay() {
  const [mediaDetails, setMediaDetails] = useState<
    {
      [title: string]: {
        title: string;
        overview: string;
        posterUrl: string;
        genre: string;
        platform?: string;
      };
    }
  >({});

  useEffect(() => {
    async function fetchMediaDetails() {
      const details: {
        [title: string]: {
          title: string;
          overview: string;
          posterUrl: string;
          genre: string;
          platform?: string;
        };
      } = {};

      for (const item of dummyData) {
        const mediaDetail = await getMediaDetails(item.title, item.type);
        if (mediaDetail) {
          details[item.title] = mediaDetail;
        }
      }
      setMediaDetails(details);
    }

    fetchMediaDetails();
  }, []);

  return (
    <div className="grid gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
      {dummyData.map(item => (
        <Card key={item.title}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.type}</CardDescription>
          </CardHeader>
          <CardContent>
            {mediaDetails[item.title] ? (
              <>
                <img
                  src={mediaDetails[item.title].posterUrl}
                  alt={item.title}
                  className="mb-4 rounded-md"
                />
                <p className="text-sm text-muted-foreground">
                  {mediaDetails[item.title].overview}
                </p>
                <p className="text-sm text-muted-foreground">
                  Genre: {mediaDetails[item.title].genre}
                </p>
                {mediaDetails[item.title].platform && (
                  <p className="text-sm text-muted-foreground">
                    Platform: {mediaDetails[item.title].platform}
                  </p>
                )}
              </>
            ) : (
              <p>Loading details...</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
