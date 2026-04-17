'use client';

import { useState } from 'react';
import BaseModal from '@/components/general/overlays/BaseModal';
import ConfirmModal from '@/components/general/overlays/ConfirmModal';
import FormModal from '@/components/general/forms/FormModal';
import PrimaryButton from '@/components/general/actions/PrimaryButton';
import PageTitle from '@/components/general/layout/PageTitle';

// Shape of the form data — one key per field
type ExampleFormValues = {
  text: string;
  email: string;
  number: string;
  date: string;
  textarea: string;
  pin: string;
  file: File | null;
  select: string;
  radio: string;
  price: string;
};

export default function ModalsPage() {
  // Controls which modal is open
  const [baseOpen, setBaseOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  // Holds the current value of every field in the form modal
  const [formValues, setFormValues] = useState<ExampleFormValues>({
    text: '',
    email: '',
    number: '',
    date: '',
    textarea: '',
    pin: '',
    file: null,
    select: '',
    radio: '',
    price: '',
  });

  // Holds any inline error messages shown below fields after a failed submit attempt
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ExampleFormValues, string>>>(
    {},
  );

  // Runs on submit — checks required fields and sets error messages if any are missing
  const validateForm = () => {
    const nextErrors: Partial<Record<keyof ExampleFormValues, string>> = {};

    if (!formValues.text.trim()) nextErrors.text = 'Text input is required.';
    if (!formValues.email.trim()) nextErrors.email = 'Email is required.';
    if (!formValues.select) nextErrors.select = 'Please choose an option.';
    if (!formValues.radio) nextErrors.radio = 'Please choose yes or no.';

    setFormErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  // Disables the submit button until all required fields are filled
  const isFormValid =
    formValues.text.trim() !== '' &&
    formValues.email.trim() !== '' &&
    formValues.select !== '' &&
    formValues.radio !== '';

  // Clears all field values and errors — called when the modal is opened fresh
  const resetForm = () => {
    setFormValues({
      text: '',
      email: '',
      number: '',
      date: '',
      textarea: '',
      pin: '',
      file: null,
      select: '',
      radio: '',
      price: '',
    });

    setFormErrors({});
  };

  return (
    <>
      <PageTitle title="MODAL EXAMPLES" />
      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4 rounded-xl border bg-white p-6 text-center shadow-md">
              <h2 className="text-byu-navy text-lg font-semibold">Base Modal</h2>
              <p className="text-sm text-gray-600">
                Basic modal container with header, body, and footer.
              </p>

              <PrimaryButton label="Open Base Modal" onClick={() => setBaseOpen(true)} />
            </div>

            <div className="space-y-4 rounded-xl border bg-white p-6 text-center shadow-md">
              <h2 className="text-byu-navy text-lg font-semibold">Confirm Modal</h2>
              <p className="text-sm text-gray-600">
                Used for confirming actions like delete or submit.
              </p>

              <PrimaryButton label="Open Confirm Modal" onClick={() => setConfirmOpen(true)} />
            </div>

            <div className="space-y-4 rounded-xl border bg-white p-6 text-center shadow-md">
              <h2 className="text-byu-navy text-lg font-semibold">Form Modal</h2>
              <p className="text-sm text-gray-600">
                Full-featured form modal with multiple input types.
              </p>

              <PrimaryButton
                label="Open Form Modal"
                onClick={() => {
                  resetForm();
                  setFormOpen(true);
                }}
              />
            </div>
          </div>
        </div>

        {/* Default, Basic Moal */}
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

        {/* Modal to Confirm an Action */}
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
        {/* Modal with a form in it */}
        <FormModal
          open={formOpen}
          title="Example Form Modal"
          values={formValues}
          setValues={setFormValues}
          errors={formErrors}
          submitDisabled={!isFormValid}
          onClose={() => setFormOpen(false)}
          onSubmit={() => {
            if (!validateForm()) return;

            console.log(formValues);
            setFormOpen(false);
          }}
          // list and order of fields in the form
          fields={[
            {
              key: 'text',
              label: 'Text Input',
              placeholder: 'Enter example text',
              required: true,
              helperText: 'This shows a standard text field with validation.',
              colSpan: 2,
            },
            {
              key: 'email',
              label: 'Email Input',
              type: 'email',
              placeholder: 'name@example.com',
              required: true,
            },
            {
              key: 'number',
              label: 'Number Input',
              type: 'number',
              placeholder: 'Enter a number',
            },
            {
              key: 'date',
              label: 'Date Input',
              type: 'date',
            },
            {
              kind: 'select',
              key: 'select',
              label: 'Select Input',
              placeholder: 'Choose one option',
              required: true,
              options: [
                { label: 'Option One', value: 'option-1' },
                { label: 'Option Two', value: 'option-2' },
                { label: 'Option Three', value: 'option-3' },
              ],
            },
            {
              key: 'price',
              label: 'Input With Adornment',
              type: 'number',
              placeholder: '0.00',
              adornment: {
                text: '$',
                position: 'start',
              },
              helperText: 'This shows how to add a small label inside the input.',
            },
            {
              key: 'pin',
              label: 'PIN Input',
              type: 'pin',
              placeholder: 'Enter 4-digit PIN',
              helperText: 'Only numbers are allowed.',
            },
            {
              kind: 'radio',
              key: 'radio',
              label: 'Radio Input',
              required: true,
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
            {
              key: 'file',
              label: 'File Input',
              type: 'file',
              accept: '.pdf,.png,.jpg,.jpeg',
            },
            // Custom Field. You do all the styling for a custom field yourself
            {
              kind: 'custom',
              key: 'previewCard',
              colSpan: 2,
              render: () => {
                const displayName = formValues.text || 'No name yet';
                const displayEmail = formValues.email || 'No email yet';
                const selectedOption =
                  formValues.select === 'option-1'
                    ? 'Option One'
                    : formValues.select === 'option-2'
                      ? 'Option Two'
                      : formValues.select === 'option-3'
                        ? 'Option Three'
                        : 'Nothing selected';

                return (
                  <div className="border-byu-royal/20 mb-6 rounded-xl border bg-linear-to-r from-blue-50 to-white p-4 shadow-sm">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-byu-navy text-lg font-semibold">Custom Field</h3>
                      <span className="bg-byu-royal rounded-full px-3 py-1 text-xs font-medium text-white">
                        Live Preview Card
                      </span>
                    </div>

                    <p className="text-sm text-gray-600">
                      This is a custom-rendered block inside the form. You can do anything you want
                      with a custom field. I chose to make this custom block update live as the user
                      types.
                    </p>

                    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div className="rounded-lg border border-gray-200 bg-white p-3">
                        <p className="text-xs tracking-wide text-gray-500 uppercase">Text Value</p>
                        <p className="text-byu-navy text-sm font-medium">{displayName}</p>
                      </div>

                      <div className="rounded-lg border border-gray-200 bg-white p-3">
                        <p className="text-xs tracking-wide text-gray-500 uppercase">Email</p>
                        <p className="text-byu-navy text-sm font-medium">{displayEmail}</p>
                      </div>

                      <div className="rounded-lg border border-gray-200 bg-white p-3">
                        <p className="text-xs tracking-wide text-gray-500 uppercase">
                          Selected Option
                        </p>
                        <p className="text-byu-navy text-sm font-medium">{selectedOption}</p>
                      </div>

                      <div className="rounded-lg border border-gray-200 bg-white p-3">
                        <p className="text-xs tracking-wide text-gray-500 uppercase">
                          Radio Choice
                        </p>
                        <p className="text-byu-navy text-sm font-medium">
                          {formValues.radio || 'No choice yet'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              },
            },
            {
              key: 'textarea',
              label: 'Textarea Input',
              type: 'textarea',
              placeholder: 'Enter longer example text here...',
              helperText: 'This spans both columns in the modal layout.',
              colSpan: 2,
            },
          ]}
        />
      </div>
    </>
  );
}
