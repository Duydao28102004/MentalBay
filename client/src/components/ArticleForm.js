// CreateArticle.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ... (rest of the imports)


const CreateArticle = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topic: '',
    detail: '',
    base64Image: '',
    file: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({
          ...formData,
          file,
          base64Image: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const selectedImage = formData.base64Image;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await axios.post('http://localhost:3001/api/createarticle', formData);
      console.log(response.data);
      navigate('/articles');
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-lg">
    <h2 className="text-2xl font-semibold mb-4">Create Article</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
            Topic:
          </label>
          <select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="">Select a topic</option>
            <option value="depression">Depression</option>
            <option value="anxietydisorders">Anxiety Disorders</option>
            <option value="bipolardisorders">Bipolar Disorders</option>
            <option value="ocd">Obsessive-Compulsive Disorder (OCD)</option>
          </select>
      </div>

      <div>
        <label htmlFor="detail" className="block text-sm font-medium text-gray-700">
          Detail:
        </label>
        <textarea
          id="detail"
          name="detail"
          value={formData.detail}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        ></textarea>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image:
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      {selectedImage && (
          <div>
            <img src={selectedImage} alt="Selected" className="mt-4 mb-2 w-full max-h-96 object-cover" />
          </div>
      )}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        Create Article
      </button>
    </form>
  </div>

  );
};

export default CreateArticle;
