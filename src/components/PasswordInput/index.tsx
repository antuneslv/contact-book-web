import { useState } from 'react'

import { Eye, EyeOff } from 'lucide-react'

import { Input, type InputProps } from '../ui/Input'

export function PasswordInput(props: InputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <Input
      type={visible ? 'text' : 'password'}
      endAdornment={
        <button
          type="button"
          onClick={() => setVisible(prevState => !prevState)}
          disabled={props.disabled}
          title={visible ? 'Ocultar senha' : 'Mostrar senha'}
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          onMouseDown={event => event.preventDefault()}
          className="text-text-tertiary hover:text-text focus-visible:ring-primary disabled:text-text-disabled flex cursor-pointer rounded transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-default"
        >
          {visible ? <EyeOff /> : <Eye />}
        </button>
      }
      {...props}
    />
  )
}
