// This page exists purely to demonstrate the error.tsx page — delete in production

export default function ErrorTest() {
  throw new Error('Test error — triggered from the home page demo');
}
