import { BookDetailsForm } from './BookDetailsForm';

export function BookDetails({ book, close }) {
  const cover = `media:///${book.coverPath}`;

  const submit = async formValues => {
    await window.api.invoke('book:updateBook', {
      bookId: book._id,
      title: formValues.title,
      collection: formValues.collection,
      tome: formValues.tome,
      author: formValues.author,
      year: formValues.year,
    });

    close();
  };

  return (
    <div className="flex flex-col h-full gap-4 items-center">
      <div className="flex flex-col">
        <img src={cover} className="w-[300px]" />
      </div>
      <div className="h-[1px] mt-2 mb-5 bg-gray-200 w-full" />
      <BookDetailsForm defaultValue={book} onSubmit={submit} onClose={close} />
    </div>
  );
}
