# React + TypeScript + Vite

## Using bun

## Configuration of form

- npm i @hookform/resolvers
- npm i react-hook-form

## Configuration of form schema validations

- zod

## Configuration of unit testing

- npm i jest
- npm i @types/jest -D
- npx ts-jest config:init
- npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom
npm install --save-dev @testing-library/user-event

## Configuration of tailwind css

- npm install tailwindcss @tailwindcss/vite
- import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
- @import "tailwindcss"

