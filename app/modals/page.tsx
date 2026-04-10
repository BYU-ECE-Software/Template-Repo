'use client';

import { useState } from 'react';
import BaseModal from '@/components/general/overlays/BaseModal';
import ConfirmModal from '@/components/general/overlays/ConfirmModal';
import FormModal from '@/components/general/forms/FormModal';
import PrimaryButton from '@/components/general/actions/PrimaryButton';
import PageTitle from '@/components/general/layout/PageTitle';

export default function ModalsPage() {
  const [baseOpen, setBaseOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    text: '',
    email: '',
    number: '',
    date: '',
    textarea: '',
    pin: '',
    file: null,
    select: '',
    radio: '',
  });

  return (
    <>
      <PageTitle title="MODAL EXAMPLES" />
      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-10">
          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Base Modal */}
            <div className="space-y-4 rounded-xl border bg-white p-6 text-center shadow-md">
              <h2 className="text-byu-navy text-lg font-semibold">Base Modal</h2>
              <p className="text-sm text-gray-600">
                Basic modal container with header, body, and footer.
              </p>

              <PrimaryButton label="Open Base Modal" onClick={() => setBaseOpen(true)} />
            </div>

            {/* Confirm Modal */}
            <div className="space-y-4 rounded-xl border bg-white p-6 text-center shadow-md">
              <h2 className="text-byu-navy text-lg font-semibold">Confirm Modal</h2>
              <p className="text-sm text-gray-600">
                Used for confirming actions like delete or submit.
              </p>

              <PrimaryButton label="Open Confirm Modal" onClick={() => setConfirmOpen(true)} />
            </div>

            {/* Form Modal */}
            <div className="space-y-4 rounded-xl border bg-white p-6 text-center shadow-md">
              <h2 className="text-byu-navy text-lg font-semibold">Form Modal</h2>
              <p className="text-sm text-gray-600">
                Full-featured form modal with multiple input types.
              </p>

              <PrimaryButton label="Open Form Modal" onClick={() => setFormOpen(true)} />
            </div>
          </div>
        </div>

        {/* ---------------- Base Modal ---------------- */}
        <BaseModal
          open={baseOpen}
          title="Title Goes Here"
          saveLabel="Save, submit, update, etc"
          onClose={() => setBaseOpen(false)}
          onSubmit={() => setBaseOpen(false)}
        >
          <p className="text-sm text-gray-700">
            This is a simple example of the BaseModal component. Anything can go here.
          </p>
        </BaseModal>

        {/* ---------------- Confirm Modal ---------------- */}
        <ConfirmModal
          open={confirmOpen}
          title="Title: Delete Item"
          message="Are you sure you want to delete this item? This action cannot be undone."
          confirmLabel="Delete"
          variant="danger"
          onConfirm={() => {
            setConfirmOpen(false);
          }}
          onCancel={() => setConfirmOpen(false)}
        />

        {/* ---------------- Form Modal ---------------- */}
        <FormModal
          open={formOpen}
          title="Example Form"
          values={formValues}
          setValues={setFormValues}
          onClose={() => setFormOpen(false)}
          onSubmit={() => {
            console.log(formValues);
            setFormOpen(false);
          }}
          fields={[
            { key: 'text', label: 'Text Input', placeholder: 'Enter text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'number', label: 'Number', type: 'number' },
            { key: 'date', label: 'Date', type: 'date' },
            {
              key: 'textarea',
              label: 'Textarea',
              type: 'textarea',
              colSpan: 2,
            },
            {
              key: 'pin',
              label: 'PIN Input',
              type: 'pin',
            },
            {
              key: 'file',
              label: 'File Upload',
              type: 'file',
              colSpan: 2,
            },
            {
              kind: 'select',
              key: 'select',
              label: 'Select Option',
              options: [
                { label: 'Option A', value: 'a' },
                { label: 'Option B', value: 'b' },
              ],
            },
            {
              kind: 'radio',
              key: 'radio',
              label: 'Radio Choice',
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
          ]}
        />
      </div>
    </>
  );
}
