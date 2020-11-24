import styled from '@emotion/styled'

export const Input = styled.input`
  padding: 4px;
  border: 1px solid #ddd;
`
export const TextArea = styled.textarea`
  padding: 4px;
  border: 1px solid #ddd;
`

export const FieldSet = styled.fieldset`
  padding: 0.5rem 1rem;
  display: grid;
  border: unset;
  grid-gap: 0.5rem;
`

export const FormLabel = styled.label`
  color: #676A6C;
  font-weight: bold;
  font-size: 12px;
`

export const ButtonPrimary = styled.button`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  color: #fff;
  background-color: #FAB43D;
  border: unset;
  border-radius: 2px;
  padding: 4px;
  width: 150px;
`