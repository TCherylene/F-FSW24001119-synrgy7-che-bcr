import { FormGroup, Label, Input } from 'reactstrap';

interface FormLabelProps {
    type: string;
    name: string;
    value: string | number | boolean | undefined;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function FormLabel({ type, name, value, onChange }: FormLabelProps) {
    // labelName: remove [], remove _ to space
    const labelName = name.replace(/_/g, ' ').replace(/\[\]/g, '');
    const inputId = name.replace(/\[\]/g, '');
    const inputType = type === "text" ? "plaintext" : type;

    const isSwitch = type === "switch";
    const formGroupClassName = isSwitch ? "row mb-3 d-flex flex-row align-items-center m-0 w-100 p-0" : "row mb-3";

    return (
        <FormGroup className={formGroupClassName} switch={isSwitch}>
            <Label htmlFor={name} className="col-sm-3 col-form-label text-capitalize">
                {labelName}
            </Label>
            <div className="col-sm-6">
                <Input
                    className="form-control"
                    type={isSwitch ? "switch" : inputType}
                    role={isSwitch ? "switch" : undefined}
                    name={name}
                    id={inputId}
                    onChange={onChange}
                    value={value[name] ?? ""}
                />
            </div>
        </FormGroup>
    );
}
