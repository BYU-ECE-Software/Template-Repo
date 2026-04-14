'use client';

import { useState } from 'react';
import FullPageForm, { type FullPageFormSection } from '@/components/general/forms/FullPageForm';
import PageTitle from '@/components/general/layout/PageTitle';
import BaseModal from '@/components/general/overlays/BaseModal';

//This type holds the main form values. Each field type is included once.
type ExampleFormValues = {
  exampleText: string;
  exampleEmail: string;
  exampleNumber: number | '';
  exampleDate: string;
  exampleTextarea: string;
  exampleFile: File | null;
  examplePin: string;
  exampleRadio: boolean | null;
  exampleSelect: string;
  examplePrice: number | '';
};

//This type is for the repeater section. Users can add more of these blocks.
type ExampleItem = {
  itemName: string;
  itemQuantity: number | '';
  itemNotes: string;
};

//This creates one empty repeater item. It keeps add/remove logic simple.
const createEmptyItem = (): ExampleItem => ({
  itemName: '',
  itemQuantity: '',
  itemNotes: '',
});

export default function ExampleFullPageFormDemo() {
  //Main form state. This stores the top-level fields.
  const [values, setValues] = useState<ExampleFormValues>({
    exampleText: '',
    exampleEmail: '',
    exampleNumber: '',
    exampleDate: '',
    exampleTextarea: '',
    exampleFile: null,
    examplePin: '',
    exampleRadio: null,
    exampleSelect: '',
    examplePrice: '',
  });

  // State for the submit confirmation modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  //Repeater state. Start with one example item.
  const [items, setItems] = useState<ExampleItem[]>([createEmptyItem()]);

  //Add a repeater block.
  const handleAddItem = () => {
    setItems((prev) => [...prev, createEmptyItem()]);
  };

  //Remove a repeater block.
  const handleRemoveItem = (indexToRemove: number) => {
    setItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  //Update one field inside a repeater item.
  const handleSetItemValue = (
    index: number,
    key: string,
    value: string | number | File | boolean | null,
  ) => {
    setItems((prev) =>
      prev.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)),
    );
  };

  //These sections tell FullPageForm what to render. This page includes every current field type once.
  const sections: FullPageFormSection<ExampleFormValues, ExampleItem>[] = [
    {
      kind: 'section',
      key: 'basicExamples',
      title: 'Example Test Input',
      description: 'This section shows the basic field types available in the template form.',
      fields: [
        {
          key: 'exampleText',
          label: 'Text Input',
          placeholder: 'Enter example text',
          required: true,
          colSpan: 2, //use colSpan: 2 when you want the input field to span the entire form width and not share with another input
        },
        {
          key: 'exampleEmail',
          label: 'Email Input',
          type: 'email',
          placeholder: 'name@example.com',
          required: true,
        },
        {
          key: 'exampleNumber',
          label: 'Number Input',
          type: 'number',
          placeholder: 'Enter a number',
          required: false,
        },
        {
          key: 'exampleDate',
          label: 'Date Input',
          type: 'date',
          required: false,
        },
        {
          key: 'exampleSelect',
          label: 'Select Input',
          kind: 'select',
          placeholder: 'Choose one option',
          required: true,
          options: [
            { label: 'Option One', value: 'option-1' },
            { label: 'Option Two', value: 'option-2' },
            { label: 'Option Three', value: 'option-3' },
          ],
        },
        {
          key: 'examplePrice',
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
          key: 'examplePin',
          label: 'PIN Input',
          type: 'pin',
          placeholder: 'Enter 4-digit PIN',
          required: false,
          helperText: 'Only numbers are allowed.',
        },
        {
          key: 'exampleSummaryCard',
          kind: 'custom',
          colSpan: 2,
          render: () => {
            const displayName = values.exampleText || 'No text';
            const displayEmail = values.exampleEmail || 'no-email@example.com';
            const selectedPlan =
              values.exampleSelect === 'option-1'
                ? 'Option One'
                : values.exampleSelect === 'option-2'
                  ? 'Option Two'
                  : values.exampleSelect === 'option-3'
                    ? 'Option Three'
                    : 'No option selected';

            const totalItems = items.reduce((sum, item) => {
              return sum + (typeof item.itemQuantity === 'number' ? item.itemQuantity : 0);
            }, 0);

            return (
              <div className="border-byu-royal/20 mb-6 rounded-xl border bg-linear-to-r from-blue-50 to-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-byu-navy text-lg font-semibold">Custom Field</h3>
                  <span className="bg-byu-royal rounded-full px-3 py-1 text-xs font-medium text-white">
                    Live Preview Card
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  This is a custom-rendered block inside the form. You can do anything you want with
                  a custom field. I chose to make this custom block update live as the user types.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <p className="text-xs tracking-wide text-gray-500 uppercase">Text Input</p>
                    <p className="text-byu-navy text-sm font-medium">{displayName}</p>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <p className="text-xs tracking-wide text-gray-500 uppercase">Email Input</p>
                    <p className="text-byu-navy text-sm font-medium">{displayEmail}</p>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <p className="text-xs tracking-wide text-gray-500 uppercase">Selected Option</p>
                    <p className="text-byu-navy text-sm font-medium">{selectedPlan}</p>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <p className="text-xs tracking-wide text-gray-500 uppercase">
                      Total Item Quantity
                    </p>
                    <p className="text-byu-navy text-sm font-medium">{totalItems}</p>
                  </div>
                </div>
              </div>
            );
          },
        },
        {
          key: 'exampleRadio',
          label: 'Radio Input',
          kind: 'radio',
          required: true,
          options: [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ],
        },
        {
          key: 'exampleFile',
          label: 'File Input',
          type: 'file',
          accept: '.pdf,.png,.jpg,.jpeg',
          required: false,
        },
        {
          key: 'exampleTextarea',
          label: 'Textarea Input',
          type: 'textarea',
          placeholder: 'Enter longer example text here...',
          colSpan: 2,
          required: false,
        },
      ],
    },
    {
      kind: 'repeater',
      key: 'exampleItems',
      title: 'Example Repeatable Section',
      description: 'This section shows how users can add more of the same group of fields.',
      addButtonLabel: 'Add Another Example Item',
      items,
      onAdd: handleAddItem,
      onRemove: handleRemoveItem,
      getItemValue: (item, key) => item[key as keyof ExampleItem],
      setItemValue: (index, key, value) => handleSetItemValue(index, key, value),
      emptyMessage: 'No example items added yet.',
      fields: [
        {
          key: 'itemName',
          label: 'Item Name',
          placeholder: 'Example item name',
          required: true,
        },
        {
          key: 'itemQuantity',
          label: 'Quantity',
          type: 'number',
          placeholder: '1',
          required: false,
        },
        {
          key: 'itemNotes',
          label: 'Item Notes',
          type: 'textarea',
          placeholder: 'Optional notes for this item...',
          colSpan: 2,
          required: false,
        },
      ],
    },
  ];

  return (
    <>
      <PageTitle title="SAMPLE FULL PAGE FORM" />
      {/* Render the Form */}
      <FullPageForm
        title="Form Title"
        intro="This sample page shows how to use the reusable FullPageForm component. Every currently supported field type is used."
        values={values}
        setValues={setValues}
        sections={sections}
        onSubmit={(e) => {
          e.preventDefault(); // prevents the browser from doing a full form submission because this is a template. when there is real form submission, that logic goes here

          console.warn('Example form values:', values);
          console.warn('Example repeater items:', items);
          setShowSuccessModal(true);
        }}
        submitLabel="Submit Example Form"
      />

      {/* Use the modal template you want for a form success pop up */}
      <BaseModal
        open={showSuccessModal}
        title="Form Submitted"
        onClose={() => setShowSuccessModal(false)}
      >
        <div className="space-y-3 py-2">
          <p className="text-gray-700">
            Your form was submitted successfully. In a real form, this is where you&apos;d handle saving
            to the database, redirecting the user, or showing a confirmation message.
          </p>
        </div>
      </BaseModal>
    </>
  );
}
