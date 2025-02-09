import React, { useState, useEffect } from 'react';
import { X, Save, ChevronDown, Search } from 'lucide-react';

const FilterSidebar = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    species: [],
    breed: [],
    age: 0,
    size: '',
    gender: [],
    goodWith: []
  });

  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState({
    breeds: false,
    applying: false,
    saving: false
  });
  const [breedSearch, setBreedSearch] = useState('');

  const [openSections, setOpenSections] = useState({
    species: true,
    breed: false,
    age: false,
    size: false,
    goodWith: false
  });

  const categories = {
    species: ['Dog', 'Cat'],
    size: ['Small', 'Medium', 'Large'],
    gender: ['Male', 'Female'],
    goodWith: ['Kids', 'Dogs', 'Cats']
  };

  const mockBreeds = {
    Dog: [
      'Labrador Retriever',
      'German Shepherd',
      'Golden Retriever',
      'French Bulldog',
      'Bulldog',
      'Poodle',
      'Beagle',
      'Rottweiler',
      'Dachshund',
      'Yorkshire Terrier'
    ],
    Cat: [
      'Siamese',
      'Persian',
      'Maine Coon',
      'British Shorthair',
      'American Shorthair',
      'Ragdoll',
      'Bengal',
      'Sphynx',
      'Scottish Fold',
      'Russian Blue'
    ]
  };

  const fetchBreeds = async (species) => {
    setLoading(prev => ({ ...prev, breeds: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const relevantBreeds = species.length === 0 
        ? Object.values(mockBreeds).flat() 
        : species.reduce((acc, s) => [...acc, ...(mockBreeds[s] || [])], []);
      setBreeds(relevantBreeds);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    } finally {
      setLoading(prev => ({ ...prev, breeds: false }));
    }
  };

  useEffect(() => {
    fetchBreeds(filters.species);
  }, [filters.species]);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value],
      ...(category === 'species' ? { breed: [] } : {})
    }));
  };

  const handleRadioChange = (value) => {
    setFilters(prev => ({
      ...prev,
      size: value
    }));
  };

  const handleSliderChange = (e) => {
    setFilters(prev => ({
      ...prev,
      age: parseInt(e.target.value)
    }));
  };

  const clearFilters = () => {
    setFilters({
      species: [],
      breed: [],
      age: 0,
      size: '',
      gender: [],
      goodWith: []
    });
    setBreedSearch('');
  };

  const savePreferences = async () => {
    setLoading(prev => ({ ...prev, saving: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Saving preferences:', filters);
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setLoading(prev => ({ ...prev, saving: false }));
    }
  };

  const applyFilters = async () => {
    setLoading(prev => ({ ...prev, applying: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onApplyFilters?.(filters);
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setLoading(prev => ({ ...prev, applying: false }));
    }
  };

  const filteredBreeds = breeds.filter(breed => 
    breed.toLowerCase().includes(breedSearch.toLowerCase())
  );

  const AccordionHeader = ({ title, isOpen, onClick }) => (
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center py-3 px-4 hover:bg-gray-100 focus:outline-none"
    >
      <span className="font-medium">{title}</span>
      <ChevronDown
        className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
      />
    </button>
  );

  return (
    <div className="w-80 h-full bg-white border rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={clearFilters}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="divide-y overflow-y-auto max-h-[calc(100vh-200px)]">
        {/* Species Section */}
        <div>
          <AccordionHeader
            title="Species"
            isOpen={openSections.species}
            onClick={() => toggleSection('species')}
          />
          {openSections.species && (
            <div className="p-4 space-y-2">
              {categories.species.map((species) => (
                <label key={species} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.species.includes(species)}
                    onChange={() => handleCheckboxChange('species', species)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span>{species}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Breed Section */}
        <div>
          <AccordionHeader
            title="Breed"
            isOpen={openSections.breed}
            onClick={() => toggleSection('breed')}
          />
          {openSections.breed && (
            <div className="p-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={breedSearch}
                  onChange={(e) => setBreedSearch(e.target.value)}
                  placeholder="Search breeds..."
                  className="w-full p-2 pr-8 border rounded-lg"
                />
                <Search className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {loading.breeds ? (
                  <div className="text-center py-2 text-gray-500">Loading breeds...</div>
                ) : filteredBreeds.length === 0 ? (
                  <div className="text-center py-2 text-gray-500">No breeds found</div>
                ) : (
                  filteredBreeds.map((breed) => (
                    <label key={breed} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.breed.includes(breed)}
                        onChange={() => handleCheckboxChange('breed', breed)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span>{breed}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Age Range Section */}
        <div>
          <AccordionHeader
            title="Age"
            isOpen={openSections.age}
            onClick={() => toggleSection('age')}
          />
          {openSections.age && (
            <div className="p-4 space-y-4">
              <input
                type="range"
                min="0"
                max="20"
                value={filters.age}
                onChange={handleSliderChange}
                className="w-full"
              />
              <div className="text-sm text-gray-600">
                {filters.age} years
              </div>
            </div>
          )}
        </div>

        {/* Size Section */}
        <div>
          <AccordionHeader
            title="Size"
            isOpen={openSections.size}
            onClick={() => toggleSection('size')}
          />
          {openSections.size && (
            <div className="p-4 space-y-2">
              {categories.size.map((size) => (
                <label key={size} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={filters.size === size}
                    onChange={() => handleRadioChange(size)}
                    className="w-4 h-4 border-gray-300"
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Good With Section */}
        <div>
          <AccordionHeader
            title="Good With"
            isOpen={openSections.goodWith}
            onClick={() => toggleSection('goodWith')}
          />
          {openSections.goodWith && (
            <div className="p-4 space-y-2">
              {categories.goodWith.map((item) => (
                <label key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.goodWith.includes(item)}
                    onChange={() => handleCheckboxChange('goodWith', item)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4 border-t">
        <button
          onClick={savePreferences}
          disabled={loading.saving}
          className="w-full flex items-center justify-center px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading.saving ? 'Saving...' : 'Save Preferences'}
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={clearFilters}
            disabled={loading.applying}
            className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={applyFilters}
            disabled={loading.applying}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading.applying ? 'Applying...' : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;