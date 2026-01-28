import React from 'react';
import { Stack, Box } from '@mui/material';
import { categories } from '../utils/constants';

const Sidebar = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="column"
    sx={{
      overflowY: 'auto',
      height: { xs: 'auto', md: '95%' },
      flexDirection: 'column',
    }}
  >
    {categories.map((category) => (
      <button
        key={category.name}
        className="category-btn"
        onClick={() => setSelectedCategory(category.name)}
        style={{
          background:
            category.name === selectedCategory ? '#FC1503' : 'transparent',
          color: category.name === selectedCategory ? 'white' : '#FC1503',
        }}
      >
        <span
          style={{
            color: category.name === selectedCategory ? 'white' : '#FC1503',
          }}
        >
          {category.icon}
        </span>
        <span style={{ opacity: category.name === selectedCategory ? 1 : 0.8 }}>
          {category.name}
        </span>
      </button>
    ))}
  </Stack>
);

export default Sidebar;
