import { chain, isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Collection } from './Collection';

export function Collections({ className = '' }) {
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState(undefined);

  useEffect(() => {
    window.api.on('book:getBooksByCollection', collections => {
      setCollections(collections);
    });

    const fetchCollections = async () => {
      setIsLoading(true);
      const collections = await window.api.invoke('book:initBooksByCollection');
      setCollections(collections);
      setIsLoading(false);
    };

    fetchCollections();

    return () => {
      window.api.removeListener('book:getBooksByCollection');
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

  if (isEmpty(collections)) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg">Encore aucun livre... 📚</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-12 ${className}`}>
      {chain(collections)
        .map((books, collection) => {
          return <Collection key={collection} collection={collection} books={books} />;
        })
        .value()}
    </div>
  );
}
