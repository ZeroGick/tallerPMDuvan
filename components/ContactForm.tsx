import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert, ActivityIndicator, Text } from 'react-native';
import FormInput from './FormInput';
import { validateEmail, validateMessage } from '../utils/validation';
import { FormData } from '../types';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
    setSubmitSuccess(false);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name) newErrors.name = 'El nombre es obligatorio';
    if (!formData.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }
    if (!formData.message) {
      newErrors.message = 'El mensaje es obligatorio';
    } else if (!validateMessage(formData.message)) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSubmitSuccess(true);
        Alert.alert(
          'Éxito',
          `Gracias ${formData.name}, tu mensaje ha sido enviado.`,
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <FormInput
        label="Nombre"
        value={formData.name}
        onChangeText={(value) => handleChange('name', value)}
        error={errors.name}
      />
      <FormInput
        label="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        error={errors.email}
        keyboardType="email-address"
      />
      <FormInput
        label="Mensaje"
        value={formData.message}
        onChangeText={(value) => handleChange('message', value)}
        error={errors.message}
        multiline
        numberOfLines={4}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Enviar" onPress={handleSubmit} disabled={isLoading} />
      )}
      {submitSuccess && (
        <Text style={styles.successText}>¡Mensaje enviado con éxito!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ContactForm;