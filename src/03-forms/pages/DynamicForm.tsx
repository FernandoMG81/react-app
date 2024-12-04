/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form } from 'formik'
import formJson from '../data/custom-form.json'
import { MySelect, MyTextInput } from '../components'
import * as Yup from 'yup';

const initialValues: { [key: string]: any } = {}
const requiredFields: { [key: string]: any } = {}

for (const input of formJson) {
  initialValues[input.name] = input.value

  if (!input.validations) continue

  let schema = Yup.string()

  for (const rule of input.validations) {
    if (rule.type === 'required') {
      schema = schema.required('Este campo es requerido')
    }

    if (rule.type === 'minLenght') {
      schema = schema.min((rule as any).value, `El campo debe tener al menos ${(rule as any).value} caracteres`)
    }
    if (rule.type === 'email') {
      schema = schema.email('El campo debe ser un correo electrónico valido')
    }
  }

  requiredFields[input.name] = schema
}

const validationSchema = Yup.object({...requiredFields})

export const DynamicForm = () => {
  return (
    <div>
      <h1>Dynamic Form</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={ validationSchema }
        onSubmit={(values) => {
          console.log(values)
        }}

      >
        {
          (formik) => (

            <Form noValidate>
              {
                formJson.map(({ type, label, name, placeholder, options }) => {

                  if (type === 'input' || type === 'password' || type === 'email') {
                    return <MyTextInput
                      key={name}
                      type={(type as any)}
                      name={name}
                      label={label}
                      placeholder={placeholder}
                    />
                  } else if (type === 'select') {
                    return (
                      <MySelect
                        key={name}
                        label={label}
                        name={name} >
                        <option value=''>Select an option</option>
                        {
                          options?.map((opt) => (
                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                          ))
                        }
                      </MySelect>
                    )
                  }

                  return <span>Type: {type} no es soportado</span>
                })
              }

              <button type='submit'>Submit</button>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}
