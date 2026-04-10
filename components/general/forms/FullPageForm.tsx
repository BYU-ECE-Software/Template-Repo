'use client';

import { useState, type ReactNode } from 'react';
import { FiEye, FiEyeOff, FiTrash2 } from 'react-icons/fi';
import PrimaryButton from '@/components/general/actions/PrimaryButton';
import FilePicker from '@/components/general/forms/FilePicker';

type FieldType = 'text' | 'email' | 'number' | 'date' | 'textarea' | 'file' | 'pin' | 'radio';

type SelectOption = {
  label: string;
  value: string;
};

type RadioOption = {
  label: string;
  value: string | number | boolean;
};

type Adornment = {
  text: string;
  position: 'start' | 'end';
};

type BaseField = {
  key: string;
  label: string;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
  colSpan?: 1 | 2;
  adornment?: Adornment;
};

type InputField = BaseField & {
  kind?: 'input';
  type?: Exclude<FieldType, 'radio'>;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  accept?: string;
};

type SelectField = BaseField & {
  kind: 'select';
  options: SelectOption[];
};

type RadioField = BaseField & {
  kind: 'radio';
  options: RadioOption[];
};

type CustomField<TItem = any> = {
  kind: 'custom';
  key: string;
  colSpan?: 1 | 2;
  render: (args: {
    value?: any;
    setValue: (value: any) => void;
    item?: TItem;
    itemIndex?: number;
  }) => ReactNode;
};

export type FullPageFormField<TItem = any> =
  | InputField
  | SelectField
  | RadioField
  | CustomField<TItem>;

type StandardSection<TValues> = {
  kind: 'section';
  key: string;
  title: string;
  description?: string;
  fields: FullPageFormField<TValues>[];
};

type RepeaterSection<TItem> = {
  kind: 'repeater';
  key: string;
  title: string;
  description?: string;
  addButtonLabel: string;
  items: TItem[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  getItemValue: (item: TItem, key: string) => any;
  setItemValue: (index: number, key: string, value: any) => void;
  fields: FullPageFormField<TItem>[];
  emptyMessage?: string;
};

export type FullPageFormSection<TValues, TRepeaterItem = any> =
  | StandardSection<TValues>
  | RepeaterSection<TRepeaterItem>;

type FullPageFormProps<TValues, TRepeaterItem = any> = {
  title?: string;
  intro?: string;
  values: TValues;
  setValues: (next: TValues) => void;
  sections: FullPageFormSection<TValues, TRepeaterItem>[];
  errors?: Record<string, string>;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
  submitting?: boolean;
  maxWidthClass?: string;
};

const LABEL_CLASS = 'block text-sm font-medium text-byu-navy mb-1';
const INPUT_CLASS =
  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-byu-navy ' +
  'focus:outline-none focus:ring-1 focus:ring-byu-royal focus:border-byu-royal';
const ERROR_CLASS = 'mt-1 text-xs text-red-600';
const SECTION_TITLE_CLASS = 'text-2xl font-semibold text-byu-navy';
const SECTION_DESC_CLASS = 'text-sm text-gray-600 mt-1';
const BOX_CLASS = 'border border-gray-300 rounded-md p-4 space-y-6 bg-white shadow-sm';

export default function FullPageForm<TValues extends Record<string, any>, TRepeaterItem = any>({
  title,
  intro,
  values,
  setValues,
  sections,
  errors,
  onSubmit,
  submitLabel = 'Submit',
  submitting = false,
  maxWidthClass = 'max-w-4xl',
}: FullPageFormProps<TValues, TRepeaterItem>) {
  const [pinVisible, setPinVisible] = useState<Record<string, boolean>>({});

  const setFieldValue = (key: string, value: any) => {
    setValues({ ...values, [key]: value });
  };

  const isPinVisible = (key: string) => Boolean(pinVisible[key]);
  const togglePinVisible = (key: string) =>
    setPinVisible((prev) => ({ ...prev, [key]: !prev[key] }));

  const sanitizePin = (raw: string) => raw.replace(/\D/g, '');

  const renderField = (
    field: FullPageFormField<any>,
    value: any,
    setValue: (value: any) => void,
    errorText?: string,
    item?: any,
    itemIndex?: number,
  ) => {
    const colSpan = field.colSpan ?? 1;
    const colClass = colSpan === 2 ? 'md:col-span-2' : '';

    if (field.kind === 'custom') {
      return (
        <div key={field.key} className={colClass}>
          {field.render({
            value,
            setValue,
            item,
            itemIndex,
          })}
        </div>
      );
    }

    const hasAdornment = Boolean(field.adornment?.text);
    const adornPos = field.adornment?.position ?? 'start';

    const inputPaddingClass = hasAdornment
      ? adornPos === 'start'
        ? 'pl-7 pr-3'
        : 'pl-3 pr-7'
      : 'px-3';

    const fieldClass = [
      'w-full rounded-md border border-gray-300 py-2 text-sm text-byu-navy',
      inputPaddingClass,
      'focus:outline-none focus:ring-1 focus:ring-byu-royal focus:border-byu-royal',
    ].join(' ');

    return (
      <div key={field.key} className={colClass}>
        <label className="mb-1 flex flex-wrap items-baseline gap-x-2">
          <span className={LABEL_CLASS}>
            {field.label} {field.required ? '*' : null}
          </span>

          {field.helperText ? (
            <span className="text-xs font-normal text-gray-500">{field.helperText}</span>
          ) : null}
        </label>

        {field.kind === 'select' ? (
          <select
            className={INPUT_CLASS}
            value={value ?? ''}
            onChange={(e) => setValue(e.target.value)}
          >
            {field.placeholder ? (
              <option value="" disabled>
                {field.placeholder}
              </option>
            ) : null}

            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : field.kind === 'radio' ? (
          <div className="space-y-2">
            {field.options.map((opt) => (
              <label key={String(opt.value)} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`${field.key}-${itemIndex ?? 'main'}`}
                  checked={value === opt.value}
                  onChange={() => setValue(opt.value)}
                />
                <span className="text-byu-navy text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        ) : field.type === 'textarea' ? (
          <div className={hasAdornment ? 'relative' : undefined}>
            {hasAdornment ? (
              <span
                className={[
                  'pointer-events-none absolute top-3 text-sm text-gray-500',
                  adornPos === 'start' ? 'left-3' : 'right-3',
                ].join(' ')}
              >
                {field.adornment!.text}
              </span>
            ) : null}

            <textarea
              rows={4}
              className={fieldClass}
              placeholder={field.placeholder ?? ''}
              value={value ?? ''}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        ) : field.type === 'pin' ? (
          <div className="relative">
            <input
              type={isPinVisible(field.key) ? 'text' : 'password'}
              className={INPUT_CLASS + ' pr-10'}
              placeholder={field.placeholder ?? ''}
              value={value ?? ''}
              onChange={(e) => setValue(sanitizePin(e.target.value))}
              inputMode="numeric"
              autoComplete="one-time-code"
            />

            <button
              type="button"
              onClick={() => togglePinVisible(field.key)}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-gray-500 hover:text-gray-700"
              aria-label={isPinVisible(field.key) ? 'Hide PIN' : 'Show PIN'}
            >
              {isPinVisible(field.key) ? (
                <FiEyeOff className="h-4 w-4" />
              ) : (
                <FiEye className="h-4 w-4" />
              )}
            </button>
          </div>
        ) : field.type === 'file' ? (
          <FilePicker value={value} accept={field.accept} onChange={(file) => setValue(file)} />
        ) : (
          <div className={hasAdornment ? 'relative' : undefined}>
            {hasAdornment ? (
              <span
                className={[
                  'pointer-events-none absolute top-1/2 -translate-y-1/2 text-sm text-gray-500',
                  adornPos === 'start' ? 'left-3' : 'right-3',
                ].join(' ')}
              >
                {field.adornment!.text}
              </span>
            ) : null}

            <input
              type={field.type ?? 'text'}
              className={hasAdornment ? fieldClass : INPUT_CLASS}
              placeholder={field.placeholder ?? ''}
              value={value ?? ''}
              onChange={(e) => {
                if (field.type === 'number') {
                  setValue(e.target.value === '' ? '' : Number(e.target.value));
                } else {
                  setValue(e.target.value);
                }
              }}
              inputMode={
                field.inputMode ?? ((field.type ?? 'text') === 'number' ? 'decimal' : undefined)
              }
            />
          </div>
        )}

        {errorText ? <p className={ERROR_CLASS}>{errorText}</p> : null}
      </div>
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`${maxWidthClass} mx-auto mt-4 mb-8 space-y-10 rounded-md bg-white p-6 shadow-md`}
    >
      {title ? (
        <div className="space-y-2">
          <h1 className="text-byu-navy text-3xl font-semibold">{title}</h1>
          {intro ? <p className="text-sm text-gray-700">{intro}</p> : null}
        </div>
      ) : null}

      {sections.map((section) => {
        if (section.kind === 'section') {
          return (
            <section key={section.key} className="space-y-4">
              <div>
                <h2 className={SECTION_TITLE_CLASS}>{section.title}</h2>
                {section.description ? (
                  <p className={SECTION_DESC_CLASS}>{section.description}</p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
                {section.fields.map((field) =>
                  renderField(
                    field,
                    values[field.key],
                    (nextValue) => setFieldValue(field.key, nextValue),
                    errors?.[field.key],
                  ),
                )}
              </div>
            </section>
          );
        }

        return (
          <section key={section.key} className="space-y-4">
            <div>
              <h2 className={SECTION_TITLE_CLASS}>{section.title}</h2>
              {section.description ? (
                <p className={SECTION_DESC_CLASS}>{section.description}</p>
              ) : null}
            </div>

            {section.items.length === 0 && section.emptyMessage ? (
              <p className="text-sm text-gray-500">{section.emptyMessage}</p>
            ) : null}

            <div className="space-y-6">
              {section.items.map((item, index) => (
                <div key={index} className={BOX_CLASS}>
                  <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
                    {section.fields.map((field) =>
                      renderField(
                        field,
                        section.getItemValue(item, field.key),
                        (nextValue) => section.setItemValue(index, field.key, nextValue),
                        errors?.[`${section.key}.${index}.${field.key}`],
                        item,
                        index,
                      ),
                    )}
                  </div>

                  {index > 0 && (
                    <div className="text-right text-sm">
                      <button
                        type="button"
                        onClick={() => section.onRemove(index)}
                        className="text-byu-red-bright hover:text-byu-red-dark inline-flex cursor-pointer items-center gap-2"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <PrimaryButton
              type="button"
              onClick={section.onAdd}
              bgClass="bg-blue-50 text-byu-royal"
              hoverBgClass="hover:bg-blue-100"
              className="px-3 py-2 text-xs"
              icon={<span className="text-base leading-none">+</span>}
            >
              {section.addButtonLabel}
            </PrimaryButton>
          </section>
        );
      })}

      <div className="flex justify-center pt-2">
        <PrimaryButton
          type="submit"
          disabled={submitting}
          label={submitting ? 'Submitting...' : submitLabel}
          className="px-6 py-2"
        />
      </div>
    </form>
  );
}
