import { useState } from 'react';

export function BookDetails({ book, close }) {
  const [form, setForm] = useState(initForm({ book }));

  const onSubmit = async e => {
    e.preventDefault();

    await window.api.invoke('book:updateBook', {
      bookId: book._id,
      title: form.title,
      author: form.author,
      year: form.year,
    });

    close();
  };

  const onChange = event => {
    const target = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [target.name]: target.value,
    }));
  };

  const isDirty = isFormDirty({ book, form });
  const cover = `media:///${book.coverPath}`;

  return (
    <div className="flex flex-col h-full gap-4 items-center">
      <div className="flex flex-col">
        <img src={cover} className="w-[300px]" />
      </div>
      <div className="h-[1px] mt-2 mb-5 bg-gray-200 w-full" />
      <form className="flex flex-col w-full gap-3" onSubmit={onSubmit}>
        <div>
          <label htmlFor="title" className="block mb-1 font-medium text-gray-900">
            Titre
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Le Chat noir"
          />
        </div>
        <div>
          <label htmlFor="author" className="block mb-1 font-medium text-gray-900">
            Auteur
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={form.author}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Edgar Allan Poe"
          />
        </div>
        <div>
          <label htmlFor="year" className="block mb-1 font-medium text-gray-900">
            Année
          </label>
          <input
            type="text"
            id="year"
            name="year"
            value={form.year}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="1843"
          />
        </div>
        <div className="flex justify-between mt-5">
          <button
            type="submit"
            disabled={!isDirty}
            className="text-white bg-main-500 hover:bg-main-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-200 disabled:opacity-75">
            Sauvegarder
          </button>
          <button
            type="action"
            onClick={close}
            className="text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Fermer
          </button>
        </div>
      </form>
    </div>
  );
}

function isFormDirty({ book, form }) {
  return (
    (form.title !== '' && book.title !== form.title) ||
    (form.author !== '' && book.author !== form.author) ||
    (form.year !== '' && book.year !== form.year)
  );
}

function initForm({ book }) {
  return {
    title: book.title || '',
    author: book.author || '',
    year: book.year || '',
  };
}
