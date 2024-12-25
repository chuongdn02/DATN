/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',       // Main file of your React Native app
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.{js,jsx,ts,tsx}',  // Include all files in your src folder
  ],
  theme: {
    extend: {
      colors: {
        primary: '#142966',   // Custom primary color
        secondary: '#14171A', // Custom secondary color
        accent: '#FF6347',    // Màu accent (đỏ cà chua)
        light: '#F8F9FA',     // Màu sáng (màu nền sáng)
        dark: '#343A40', // Màu tối (màu nền tối)
        warning: '#FFC107', // Màu cảnh báo (vàng)
        themeColor: '##00FF00',   // Màu thành công (xanh lá)
        success: '#28A745',  // Màu thành công (xanh lá)

      },
      boxShadow: {
        custom: '0 4px 6px rgba(255, 255, 255, 0.5)',
      },
    },
  },
  plugins: [],
};
