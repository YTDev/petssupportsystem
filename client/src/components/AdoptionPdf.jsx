import React from 'react';
// Importação dos componentes necessários do react-pdf/renderer
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

// Definição dos estilos para o documento PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff'  // Fundo branco para a página
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30  // Espaçamento abaixo do título
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12  // Tamanho da fonte para o conteúdo
  },
  field: {
    marginBottom: 10,
    borderBottom: 1,  // Linha inferior para campos de preenchimento
    paddingBottom: 5
  }
});

// Componente que define a estrutura do documento PDF
const AdoptionDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Acordo de Adoção de Animal</Text>
      <View style={styles.section}>
        {/* Campos para preenchimento manual */}
        <Text style={styles.field}>Nome do Adotante: _______________________</Text>
        <Text style={styles.field}>Nome do Animal: _______________________</Text>
        <Text style={styles.field}>Espécie/Raça: _______________________</Text>
        <Text style={styles.field}>Data: _______________________</Text>
        <Text style={styles.field}>Morada: _______________________</Text>
        <Text style={styles.field}>Telefone: _______________________</Text>
        <Text style={styles.field}>Email: _______________________</Text>
        
        {/* Secção de termos e condições */}
        <Text style={{ marginTop: 20, marginBottom: 10 }}>
          Eu concordo em fornecer os cuidados e manutenção adequados a este animal, incluindo:
        </Text>
        {/* Lista de responsabilidades */}
        <Text>• Alimentação, água e abrigo adequados</Text>
        <Text>• Cuidados veterinários quando necessário</Text>
        <Text>• Exercício e atenção</Text>
        <Text>• Ambiente seguro e amoroso</Text>
        
        {/* Campo para assinatura */}
        <Text style={{ marginTop: 30, marginBottom: 20 }}>
          Assinatura: _______________________
        </Text>
      </View>
    </Page>
  </Document>
);

// Componente principal da aplicação
function AdoptionPdf() {
  // Função para abrir o PDF num novo separador
  const openPDF = async () => {
    const blob = await pdf(<AdoptionDocument />).toBlob();  // Gera o blob do PDF
    const url = URL.createObjectURL(blob);  // Cria URL temporária
    window.open(url, '_blank');  // Abre numa nova janela
  };

  return (
    <div className="p-6">
      {/* Botão para gerar e abrir o PDF */}
      <button
        onClick={openPDF}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 inline-block"
      >
        Abrir Acordo de Adoção
      </button>
    </div>
  );
}

export default AdoptionPdf;