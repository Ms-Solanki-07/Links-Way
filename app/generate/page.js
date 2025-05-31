import React, { Suspense } from 'react';
import GenerateForm from '@/components/GenerateForm';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GenerateForm />
    </Suspense>
  );
}
