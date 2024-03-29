import { useFetchPhotosQuery, useAddPhotoMutation } from '../store';
import Button from './Button';
import PhotosListItem from './PhotosListItem';
import Skeleton from './Skeleton';

function PhotosList({ album }) {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-10 w-full" times={4} />;
  } else if (error) {
    content = <div>Error fetching photos..!</div>;
  } else {
    content = data.map(photo => (
      <PhotosListItem key={photo.id} photo={photo} />
    ));
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos In {album.title}</h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className="flex gap-8 flex-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  );
}

export default PhotosList;
