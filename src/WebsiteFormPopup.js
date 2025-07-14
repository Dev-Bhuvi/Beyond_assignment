import React, { useState } from 'react';
import './App.css';

function WebsiteFormPopup({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    url: '',
    country: '',
    category: '',
    language: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  // Country to Language Map
 const countryLanguageMap = {
  India: { language: 'Hindi', flag: '🇮🇳' },
  USA: { language: 'English', flag: '🇺🇸' },
  France: { language: 'French', flag: '🇫🇷' },
  Germany: { language: 'German', flag: '🇩🇪' },
  China: { language: 'Mandarin', flag: '🇨🇳' },
  Japan: { language: 'Japanese', flag: '🇯🇵' },
  Australia: { language: 'English', flag: '🇦🇺' },
  Canada: { language: 'English/French', flag: '🇨🇦' },
  Brazil: { language: 'Portuguese', flag: '🇧🇷' },
  Spain: { language: 'Spanish', flag: '🇪🇸' }
};

  // Category Options
  const categoryOptions = [
    'Entertainment',
    'Business',
    'Ecommerce',
    'Travells'
  ];

  const validate = () => {
    let tempErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key]) tempErrors[key] = 'This field is required';
      else if (formData[key].toLowerCase().includes('negative')) tempErrors[key] = 'Cannot be negative';
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'country') {
  setFormData({
    ...formData,
    country: value,
    language: countryLanguageMap[value]?.language || ''
  });
  setErrors({ ...errors, country: '' });

    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({
        url: '',
        country: '',
        category: '',
        language: '',
        description: ''
      });
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h3>Add Website Listing</h3>
        <form onSubmit={handleSubmit}>
          {['url', 'country', 'category', 'language', 'description'].map((field) => (
            <div key={field} className="form-group">
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>

              {/* Country Dropdown */}
              {field === 'country' ? (
                <select
  name="country"
  value={formData.country}
  onChange={handleChange}
>
  <option value="">Select a country</option>
  {Object.keys(countryLanguageMap).map((country) => (
    <option key={country} value={country}>
      {countryLanguageMap[country].flag} {country}
    </option>
  ))}
</select>


              ) : field === 'category' ? (
                // Category Dropdown
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

              ) : field === 'language' ? (
                // Language Read-only Field
                <input
                  name="language"
                  value={formData.language}
                  readOnly
                  placeholder="Language auto-filled"
                />
              ) : (
                // Default Input
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  title="This field is required and must not contain 'negative'"
                />
              )}

              {/* Error Message */}
              {errors[field] && <div className="error">{errors[field]}</div>}
            </div>
          ))}

          <button className="submitbtn" type="submit">Submit</button>
          <button type="button" className="close-btn" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default WebsiteFormPopup;
