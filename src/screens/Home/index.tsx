import { Formik, FormikHelpers } from 'formik';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, TextInput as RNTextInput, View } from 'react-native';
import { Appbar, Button, Text, TextInput, useTheme } from 'react-native-paper';
import { Spacer } from '../../components/Spacer';


type RegisterFormProps = {
  email: string;
  password: string;
  name: string;
  confirm_password: string;
  cpf: string;
  cep: string;
  phone: string;
  birth_date: string;
};

const formikInitialValues: RegisterFormProps = {
  email: '',
  password: '',
  name: '',
  confirm_password: '',
  cpf: '',
  cep: '',
  phone: '',
  birth_date: '',
};


export function Home() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const titleStyle = {
    color: theme.colors.primary,
  }
  const appBarBackgroundColor = {
    backgroundColor: theme.colors.primaryContainer,
  }
  const emailInputRef = useRef<RNTextInput>(null);
  const passwordInputRef = useRef<RNTextInput>(null);
  const confirm_passwordInputRef = useRef<RNTextInput>(null);
  const cpfInputRef = useRef<RNTextInput>(null);
  const cepInputRef = useRef<RNTextInput>(null);
  const phoneInputRef = useRef<RNTextInput>(null);
  const birth_dateInputRef = useRef<RNTextInput>(null);


  function setCpfMask(value: string) {
    //cpf mask 999.999.999-99
    const valueFormatted = value.
      replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+$/, '$1')
    return valueFormatted;
  }

  function setCepMask(value: string) {
    const valueFormatted = value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})(\d+?)$/, "$1");


    return valueFormatted;
  }

  function setPhoneMask(value: string) {
    //phone mask (99) 99999-9999
    const valueFormatted = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)$/, "$1");

    return valueFormatted;
  }

  function setDateMask(value: string) {
    //date mask 99/99/9999
    const valueFormatted = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d+?)$/, "$1");

    return valueFormatted;
  }

  function removeMask(value: string) {
    const valueFormatted = value
      .replace(/\D/g, "")
    return valueFormatted;
  }


  function handleSubmit(
    values: RegisterFormProps,
    actions: FormikHelpers<RegisterFormProps>
  ) {
    setIsLoading(true);
    try {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      console.log("========== Form data ==========");
      console.log(values);
      console.log("Valores formatados:")
      console.log("CPF:", values.cpf)
      console.log("CEP", values.cep)
      console.log("Phone:", values.phone)
      console.log("Birth Date:", values.birth_date)
      console.log("========== Form data desformatados ==========");
      console.log("Valores reais:")
      console.log("CPF:", removeMask(values.cpf));
      console.log("CEP", removeMask(values.cep));
      console.log("Phone:", removeMask(values.phone));
      console.log("Birth Date:", removeMask(values.birth_date));
    } catch (error) {
      console.log(error);
      actions.setSubmitting(false);
    }

  }
  return (
    <>
      <Appbar.Header style={[styles.appBar, appBarBackgroundColor]}>
        <Appbar.BackAction onPress={() => { }} />
        <Appbar.Content title="Cadastro" />
        <Appbar.Action icon="calendar" onPress={() => { }} />
        <Appbar.Action icon="brightness-5" onPress={() => { }} />
      </Appbar.Header>

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.form}
        >
          <Text
            variant='displayLarge'
            style={titleStyle}>Realize o Cadastro
          </Text>

          <Spacer vertical={56} />

          <Formik
            initialValues={formikInitialValues}
            onSubmit={handleSubmit}
          >
            {({ handleChange, setFieldValue, handleBlur, handleSubmit, values }) => (

              <View
                onStartShouldSetResponder={() => true}
                style={styles.form}
              >
                <TextInput
                  mode='outlined'
                  label='Nome'
                  selectionColor='#bebef8'
                  placeholder='Nome'
                  accessibilityHint='Digite sua Nome'
                  accessibilityLabel="Nome"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  style={styles.input}
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                />

                <Spacer vertical={24} />


                <TextInput
                  ref={emailInputRef}
                  mode='outlined'
                  label='E-mail'
                  selectionColor='#bebef8'
                  placeholder='E-mail'
                  accessibilityHint='Digite seu E-mail'
                  accessibilityLabel="E-mail"
                  keyboardType='email-address'
                  onChangeText={(value) => setFieldValue('email', value)}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.input}
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                />

                <Spacer vertical={24} />

                <TextInput
                  ref={passwordInputRef}
                  mode='outlined'
                  label='Senha'
                  selectionColor='#bebef8'
                  secureTextEntry
                  placeholder='Senha'
                  accessibilityHint='Digite sua senha'
                  accessibilityLabel="Senha"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={styles.input}
                  onSubmitEditing={() => confirm_passwordInputRef.current?.focus()}
                />

                <Spacer vertical={24} />
                <TextInput
                  ref={confirm_passwordInputRef}
                  mode='outlined'
                  label='Confirmar Senha'
                  selectionColor='#bebef8'
                  secureTextEntry
                  placeholder='Confirmar Senha'
                  accessibilityHint='Digite sua senha novamente'
                  accessibilityLabel="Senha"
                  onChangeText={handleChange('confirm_password')}
                  onBlur={handleBlur('confirm_password')}
                  value={values.confirm_password}
                  style={styles.input}
                  onSubmitEditing={() => cpfInputRef.current?.focus()}
                />

                <Spacer vertical={24} />

                <View style={styles.row}>
                  <TextInput
                    ref={cpfInputRef}
                    mode='outlined'
                    label='CPF'
                    selectionColor='#bebef8'
                    placeholder='CPF'
                    maxLength={14}
                    accessibilityHint='Digite sua CPF'
                    accessibilityLabel="CPF"
                    keyboardType='numeric'
                    onChangeText={(value) => setFieldValue('cpf', setCpfMask(value))}
                    onBlur={handleBlur('cpf')}
                    value={values.cpf}
                    style={styles.smallInput}
                    onSubmitEditing={() => cepInputRef.current?.focus()}
                  />

                  <Spacer vertical={24} />

                  <TextInput
                    ref={cepInputRef}
                    mode='outlined'
                    label='CEP'
                    selectionColor='#bebef8'
                    placeholder='CEP'
                    accessibilityHint='Digite sua CEP'
                    accessibilityLabel="CEP"
                    keyboardType='numeric'
                    maxLength={9}
                    onChangeText={(value) => setFieldValue('cep', setCepMask(value))}
                    onBlur={handleBlur('cep')}
                    value={values.cep}
                    style={styles.smallInput}
                    onSubmitEditing={() => phoneInputRef.current?.focus()}
                  />
                </View>


                <Spacer vertical={24} />



                <TextInput
                  ref={phoneInputRef}
                  mode='outlined'
                  label='Telefone'
                  selectionColor='#bebef8'
                  placeholder='Telefone'
                  accessibilityHint='Digite sua número de telefone'
                  accessibilityLabel="Número de telefone"
                  keyboardType='numeric'
                  maxLength={15}
                  onChangeText={(value) => setFieldValue('phone', setPhoneMask(value))}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  style={styles.input}
                  onSubmitEditing={() => birth_dateInputRef.current?.focus()}
                />

                <Spacer vertical={24} />

                <TextInput
                  ref={birth_dateInputRef}
                  mode='outlined'
                  label='Data de Nascimento'
                  selectionColor='#bebef8'
                  placeholder='Data de Nascimento'
                  accessibilityHint='Digite sua data de nascimento'
                  accessibilityLabel="Data de Nascimento"
                  keyboardType='numeric'
                  returnKeyType='send'
                  maxLength={10}
                  onChangeText={(value) => setFieldValue('birth_date', setDateMask(value))}
                  onBlur={handleBlur('birth_date')}
                  value={values.birth_date}
                  style={styles.input}
                  onSubmitEditing={() => {
                    if (isLoading || !values.email || !values.password
                      || !values.name || !values.confirm_password || !values.cpf
                      || !values.cep || !values.phone || !values.birth_date
                    ) {
                      return;
                    }
                    handleSubmit();
                  }}
                />

                <Spacer vertical={24} />


                <Button
                  disabled={isLoading || !values.email || !values.password
                    || !values.name || !values.confirm_password || !values.cpf
                    || !values.cep || !values.phone || !values.birth_date
                  }
                  loading={isLoading}
                  accessibilityHint="Clique para entrar"
                  accessibilityLabel="Entrar"
                  mode="contained-tonal"
                  onPress={() => handleSubmit()}>
                  Entrar
                </Button>
              </View>

            )}
          </Formik>
        </ScrollView>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appBar: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  container: {
    flex: 1,
    marginHorizontal: 32,
    marginVertical: 32,
  },

  form: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    width: '100%',
  },
  smallInput: {
    width: '48%',
  }
});