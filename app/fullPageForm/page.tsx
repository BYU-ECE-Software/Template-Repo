'use client';

import { useState } from 'react';
import FullPageForm, { type FullPageFormSection } from '@/components/general/forms/FullPageForm';
import PageTitle from '@/components/general/layout/PageTitle';

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

  //This sample submit just logs the data. Real validation can be added later.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Example form values:', values);
    console.log('Example repeater items:', items);
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
      {/*// Render the Form*/}
      <FullPageForm
        title="Form Title"
        intro="This sample page shows how to use the reusable FullPageForm component. Every currently supported field type is used."
        values={values}
        setValues={setValues}
        sections={sections}
        onSubmit={handleSubmit}
        submitLabel="Submit Example Form"
      />
    </>
  );
}
