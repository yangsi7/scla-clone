import { z } from 'zod';

// Blood Pressure validation
export const bloodPressureSchema = z.object({
  systolic: z.number()
    .min(60, 'Systolic pressure seems too low')
    .max(250, 'Systolic pressure seems too high'),
  diastolic: z.number()
    .min(40, 'Diastolic pressure seems too low')
    .max(150, 'Diastolic pressure seems too high'),
  arm: z.enum(['left', 'right']),
  date: z.date(),
}).refine(data => data.systolic > data.diastolic, {
  message: "Systolic pressure must be higher than diastolic",
  path: ["systolic"],
});

// Symptom validation
export const symptomSchema = z.object({
  symptom: z.string().min(1, 'Please select a symptom'),
  intensity: z.number().min(1).max(10),
  triggers: z.array(z.string()).optional(),
  duration: z.enum(['ongoing', 'intermittent']),
  durationTime: z.number().optional(),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
});

// Login validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const sixDigitSchema = z.string().length(6, 'Code must be 6 digits').regex(/^\d+$/, 'Code must contain only numbers');