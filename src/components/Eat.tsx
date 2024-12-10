// src/components/Eat.tsx

import React from 'react';
import GridComponent from './GridComponent';
import DateTimePickerComponent from './DateTimePickerComponent';
import TextFieldComponent from './TextFieldComponent';
import SingleSelectButtonGroup from './SingleSelectButtonGroup';
import { useAppContext } from '../Context';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

interface EatFormProps {
  formData: any;
  onUpdate: (newData: any) => void;
}

const EatForm: React.FC<EatFormProps> = ({ formData, onUpdate }) => {
  const { translate } = useAppContext();

  const handleChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  // Opções de alimentação
  const feedingOptions = [
    { value: 'mamadeira', label: translate('breastfeeding_bottle') },
    { value: 'peito', label: translate('breastfeeding_breast') },
  ];

  // Opções para o campo "Lado"
  const sideOptions = [
    { value: 'direito', label: translate('right_side') },
    { value: 'esquerdo', label: translate('left_side') },
    { value: 'ambos', label: translate('both_sides') },
  ];

  const dateTime = formData.date_time ? new Date(formData.date_time) : null;

  return (
    <GridComponent container spacing={2} sx={{ marginTop: '20px' }}>
      {/* Data e Hora */}
      <GridComponent item xs={12}>
        <DateTimePickerComponent
          label={translate('date_time')}
          value={dateTime}
          onChange={(date: Date | null) => handleChange('date_time', date)}
          fullWidth
        />
      </GridComponent>

      {/* Tipo de Alimentação */}
      <GridComponent item xs={12}>
        <SingleSelectButtonGroup
          options={feedingOptions}
          selectedValue={formData.type || ''}
          onChange={(value) => handleChange('type', value)}
        />
      </GridComponent>

      {/* Campo Condicional: Quantidade (apenas para "mamadeira") */}
      {formData.type === 'mamadeira' && (
        <GridComponent item xs={12}>
          <TextFieldComponent
            label={translate('quantity')}
            type="number"
            value={formData.quantity || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange('quantity', e.target.value)
            }
            fullWidth
            inputProps={{ min: 1 }}
          />
        </GridComponent>
      )}

      {/* Campo Condicional: Lado (apenas para "peito") */}
      {formData.type === 'peito' && (
        <GridComponent item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="side-label">{translate('side')}</InputLabel>
            <Select
              labelId="side-label"
              id="side-select"
              value={formData.side || ''}
              label={translate('side')}
              onChange={(e) => handleChange('side', e.target.value)}
            >
              {sideOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </GridComponent>
      )}

      {/* Duração */}
      <GridComponent item xs={12}>
        <TextFieldComponent
          label={translate('duration_minutes')}
          type="number"
          value={formData.duration || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange('duration', e.target.value)
          }
          fullWidth
          inputProps={{ min: 1 }}
        />
      </GridComponent>

      {/* Observações */}
      <GridComponent item xs={12}>
        <TextFieldComponent
          label={translate('notes')}
          value={formData.notes || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange('notes', e.target.value)
          }
          fullWidth
          multiline
          rows={4}
        />
      </GridComponent>
    </GridComponent>
  );
};

export default EatForm;
