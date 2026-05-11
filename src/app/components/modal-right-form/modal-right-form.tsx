"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RefObject, Fragment, useState } from "react"
import { DefaultForm } from "../../services/form/types"
import Select from "react-select";
import { toast } from "sonner"

type Props<T extends Record<string, unknown>> = {
  title: string;
  description?: string;
  btnToLink: RefObject<HTMLButtonElement | null>;
  form: DefaultForm;
  btnAction: (item: T) => void;
}

const ModalRightForm = <T extends Record<string, unknown>>({
    title,
    description,
    btnToLink,
    form,
    btnAction
}: Props<T>) => {
    const [open, setOpen] = useState(false)
    const [trySubmit, setTrySubmit] = useState(false)
    const [inputForm, setInputForm] = useState({} as T)

    // Limpa o formulario toda vez que abrir o modal
    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)

        if (isOpen) {
            setInputForm({} as T)
            setTrySubmit(false)
        }
    }

    const handleChange = (key: string, value: unknown) => {
        if(value === '' || value === null || value === undefined) {
            const { [key]: _, ...rest } = inputForm
            setInputForm(rest as T)
            return
        }
        setInputForm(prev => ({
            ...prev,
            [key]: value
        }))
    }
    
    // Valida os campos listados como obrigatórios
    const validateForm = () => {
        const errors: Record<string, string> = {}

        form.forEach(field => {
            if (field.required) {
            const value = inputForm[field.fieldName as keyof T]

            if (
                value === undefined ||
                value === null ||
                value === ''
            ) {
                errors[field.fieldName] = `Campo ${field.label} é obrigatório`
            }
            }
        })

        return errors
    }

    const handleSubmit = () => {
        setTrySubmit(true)
        const errors = validateForm()

        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((err) => {
                toast.error(err, { position: "bottom-center" })
            })
            return
        }

        btnAction(inputForm as T)
    }

    return (
        <div className="grid grid-cols-1">
            <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <Button
                ref={btnToLink}
                className='hidden'
                variant="outline"
                >
                </Button>
            </SheetTrigger>
            <SheetContent className="right-modal">
                <SheetHeader>
                <SheetTitle className='right-modal-title'>{title}</SheetTitle>
                <SheetDescription className='right-modal-description'>
                    {description}
                </SheetDescription>
                </SheetHeader>
                    <div className="right-modal-form">
                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                        { form.map((field, index) => (
                            <Fragment key={index}>
                                {field.type === 'text' && (
                                    <div key={index} className="grid gap-3">
                                        <Label htmlFor={`form-${field.fieldName}`}>{field.label}{field.required && ' *'}</Label>
                                        <Input 
                                            id={`form-${field.fieldName}`}
                                            type="text"
                                            placeholder={field.placeHolder || field.label}
                                            aria-invalid={field.required && !inputForm[field.fieldName as keyof T] && trySubmit}
                                            onChange={(e) => {
                                                handleChange(field.fieldName, e.target.value)
                                            }}
                                        />
                                    </div>
                                )}
                                {field.type === 'password' && (
                                    <div key={index} className="grid gap-3">
                                        <Label htmlFor={`form-${field.fieldName}`}>{field.label}{field.required && ' *'}</Label>
                                        <Input 
                                            id={`form-${field.fieldName}`}
                                            type="password"
                                            placeholder={field.placeHolder || field.label}
                                            aria-invalid={field.required && !inputForm[field.fieldName as keyof T] && trySubmit}
                                            onChange={(e) => {
                                                handleChange(field.fieldName, e.target.value)
                                            }}
                                        />
                                    </div>
                                )}
                                {field.type === 'select' && (
                                    <div key={index} className="grid gap-3">
                                        <Label htmlFor={`form-${field.fieldName}`}>{field.label}{field.required && ' *'}</Label>
                                        <Select
                                            inputId={`form-${field.fieldName}`}
                                            instanceId={`form-${field.fieldName}`}
                                            isClearable
                                            isSearchable
                                            classNamePrefix="react-select"
                                            options={field.options}
                                            placeholder={field.placeHolder || field.label}
                                            onChange={(e) => {
                                                handleChange(field.fieldName, e?.value)
                                            }}
                                            className={`select-sm ${
                                                field.required &&
                                                (inputForm[field.fieldName as keyof T] === undefined ||
                                                inputForm[field.fieldName as keyof T] === null ||
                                                inputForm[field.fieldName as keyof T] === '') &&
                                                trySubmit
                                                ? 'aria-invalid'
                                                : ''
                                            }`}
                                        />
                                    </div>
                                )}
                            </Fragment>
                        )) }
                    </div>
                    </div>
                <SheetFooter>
                <Button 
                    type="submit"
                    onClick={handleSubmit}
                >
                    Save changes
                </Button>
                </SheetFooter>
            </SheetContent>
            </Sheet>
        </div>
    )
}

export default ModalRightForm