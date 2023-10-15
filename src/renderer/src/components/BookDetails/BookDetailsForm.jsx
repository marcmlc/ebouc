import { useState } from 'react';

export function BookDetailsForm({ defaultValue, onSubmit, onClose }) {
  const [form, setForm] = useState(initForm({ defaultValue }));
  const isDirty = isFormDirty({ defaultValue, form });

  const submitForm = async e => {
    e.preventDefault();
    onSubmit(form);
  };

  const closeForm = () => onClose();

  const onChange = event => {
    const target = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [target.name]: target.value,
    }));
  };

  return (
    <form className="flex flex-col w-full gap-3" onSubmit={submitForm}>
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
        <label htmlFor="collection" className="block mb-1 font-medium text-gray-900">
          Collection
        </label>
        <input
          type="text"
          id="collection"
          name="collection"
          value={form.collection}
          onChange={onChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="Tintin"
        />
      </div>
      <div>
        <label htmlFor="tome" className="block mb-1 font-medium text-gray-900">
          Tome
        </label>
        <input
          type="text"
          id="tome"
          name="tome"
          value={form.tome}
          onChange={onChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="12"
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
          type="button"
          onClick={closeForm}
          className="text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Fermer
        </button>
      </div>
    </form>
  );
}

function initForm({ defaultValue }) {
  return {
    title: defaultValue.title || '',
    collection: defaultValue.collection || '',
    tome: defaultValue.tome || '',
    author: defaultValue.author || '',
    year: defaultValue.year || '',
  };
}

function isFormDirty({ defaultValue, form }) {
  return (
    (form.title !== '' && defaultValue.title !== form.title) ||
    (form.collection !== '' && defaultValue.collection !== form.collection) ||
    (form.tome !== '' && defaultValue.tome !== form.tome) ||
    (form.author !== '' && defaultValue.author !== form.author) ||
    (form.year !== '' && defaultValue.year !== form.year)
  );
}
