import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import '../styles/styles.css'

import { MyCheckbox, MySelect, MyTextInput } from '../components'


export const FormikAbstraction = () => {


  return (
    <div>
      <h1>Formik Abstraction</h1>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          terms: false,
          jobType: ''
        }}
        onSubmit={(values) => {
          console.log(values)
        }}
        validationSchema={
          Yup.object({
            firstName: Yup.string()
              .max(15, 'Debe de tener 15 caracteres o menos')
              .required('Requerido'),
            lastName: Yup.string()
              .max(15, 'Debe de tener 10 caracteres o menos')
              .required('Requerido'),
            email: Yup.string()
              .email('Debe de ser una email valido')
              .required('Requerido'),
            terms: Yup.boolean()
              .isTrue('Debe de aceptar las condiciones'),
            jobType: Yup.string()
              .required('Requerido')
              .notOneOf(['', 'it-jr'], 'Esta opción no es permitida')
          })
        }
      >

        {
          () => (
            <Form>

              <MyTextInput
                label='First Name'
                name='firstName'
                placeholder='Fernando'
              />

              <MyTextInput
                label='Last Name'
                name='lastName'
                placeholder='Gordillo'
              />

              <MyTextInput
                label='Email Address'
                name='email'
                placeholder='john@google.com'
              />

              <MySelect label="Job Type" name="jobType" >
                <option value="jobType">Pick something</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="it-senior">IT Senior</option>
                <option value="it-jr">IT Junior</option>
              </MySelect>

              <MyCheckbox label="Terms and Conditions" name="terms" />


              <button type='submit'>Submit</button>
            </Form>
          )
        }

      </Formik>



    </div>
  )
}
