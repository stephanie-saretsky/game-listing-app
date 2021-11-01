import React from 'react';
import {Formik, Form, FormikProps, Field, FieldArray} from 'formik';
import * as Yup from 'yup';
import SelectWithTags from "./SelectInput";

type CommonFormik = FormikProps<any> & { validation: Yup.ObjectSchema<any> };

const GameForm: React.FC<any> = (props) => {
    const { validationSchema, onSubmit } = props;

    const validation = Yup.object().shape(validationSchema);

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{images: [{url:''}] }}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={onSubmit}
            validationSchema={validation}>
            {(formik: CommonFormik) => {
                const errors = Object.values(formik.errors);
                const downloadable = formik.values.isDownloadable ? "Downloadable" : "Not downloadable";
                const streamable = formik.values.isStreamable ? "Streamable" : "Not streamable";
                // @ts-ignore
                return (
                        <Form onKeyDown={onKeyDown} translate={'yes'}>
                            <h1 className="text-indigo-400 text-3xl w-80 font-bold italic p-1">
                                ADD NEW GAME
                            </h1>
                            <hr className="bg-indigo-50 h-2 border-none my-8" />
                            {errors.length === 0 ? null : (
                                <div className="bg-red-500 rounded-md text-center text-white text-sm font-bold h-8 pt-2 mb-8">
                                    {errors.join(' ')}
                                </div>
                            )}
                            <div className="grid-cols-2 grid gap-2 grid-wrap w-50">
                            <Field
                                className="bg-gray-100 w-5/6 h-8 pl-2 mb-8"
                                id="category" name="category"
                                placeholder="Category"
                            />
                            <Field
                                className="bg-gray-100 w-5/6 h-8 pl-2 mb-8"
                                id="title"
                                name="title"
                                placeholder="Title"
                            />
                            <Field
                                className="bg-gray-100 w-5/6 h-8 pl-2 mb-8"
                                id="subtitle"
                                name="subtitle"
                                placeholder="Subtitle"
                            />
                            <Field
                                className="bg-gray-100 w-5/6 h-8 pl-2 mb-8"
                                id="description"
                                name="description"
                                placeholder="Description"
                            />
                            <Field
                               className="bg-gray-100 w-5/6 h-8 pl-2 mb-8"
                               id="version"
                               name="version"
                               placeholder="Version"
                            />
                            <Field
                                className="bg-gray-100 w-5/6 h-8 pl-2 mb-8"
                                id="type"
                                name="type"
                                type="number"
                                placeholder="Type"
                            />
                            <Field
                                className="bg-gray-100 w-5/6 h-8 pl-2 mb-8"
                                id="author"
                                name="author"
                                placeholder="Your username"
                            />
                            <Field
                                className="bg-gray-100 w-5/6 h-8 pl-2 mb-8"
                                id="replayBundleUrlJson"
                                name="replayBundleUrlJson"
                                type="url"
                                placeholder="Replay URL"
                            />
                            <Field
                                className="bg-gray-100 w-5/6 h-8 pl-2 mb-8"
                                id="duration"
                                name="duration"
                                type="number"
                                placeholder="Duration"
                            />
                            <FieldArray
                               name="images"
                               render={arrayHelpers => (
                                  <div>
                                    {formik.values.images?.map((image: object, index: number) => (
                                      <div key={index}>
                                           <Field
                                              className="bg-gray-100 h-8 pl-2 w-5/6 mb-4"
                                              name={`images.${index}.url`}
                                              type="url"
                                              placeholder="IMAGE URL"
                                           />
                                           <button
                                               type="button"
                                               className="ml-2 align-center justify-center h-2"
                                               onClick={(image) => {
                                                   arrayHelpers.remove(formik.values.images.indexOf(image));
                                               }}
                                           >
                                               -
                                           </button>
                                           <button
                                              className="justify-center h-2 align-center mb-4 pl-4"
                                              type="button"
                                              onClick={() => arrayHelpers.push({ url: "" })}
                                           >
                                              +
                                          </button>
                                        </div>
                                    ))}
                                  </div>
                                  )}
                               />
                                <SelectWithTags
                                    inputValue={formik.values.tags}
                                    name="tags"
                                    onChange={(key, value) => {
                                        formik.setFieldValue(key, value || undefined);
                                    }}
                                    options={[
                                        { label: 'MMA', value: 'MMA' },
                                        { label: 'Live', value: 'Live' },
                                        { label: 'Fight', value: 'Fight' },
                                    ]}
                                />
                               <div className="flex flex-col">
                                  <label>
                                     <Field className="w-4 h-4 rounded mr-4" type="checkbox" name="isDownloadable" />
                                        {downloadable}
                                  </label>
                                  <label>
                                     <Field className="w-4 h-4 rounded mr-4" type="checkbox" name="isStreamable" />
                                        {streamable}
                                  </label>
                               </div>
                            </div>
                            <hr className="bg-indigo-50 h-2 border-none my-8" />
                            <div className="flex flex-row justify-end">
                            <button
                                className='btn bg-indigo-400 hover:bg-indigo-700 h-12 w-28 text-white'
                                type="submit"
                            >
                                SUBMIT
                            </button>
                            </div>
                        </Form>
                );
            }}
        </Formik>
    );
};

export default GameForm;

function onKeyDown(keyEvent: { charCode: any; keyCode: any; preventDefault: () => void; }) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
        keyEvent.preventDefault();
    }
}

