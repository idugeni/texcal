import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  header: { fontSize: 24, marginBottom: 20 },
  section: { marginBottom: 10 },
  label: { fontSize: 12, color: '#666' },
  value: { fontSize: 14 }
});

export const PDFReport = ({ data, result }: { 
  data: { 
    tglPenahanan: string | Date,
    masaPidana: {
      tahun: number,
      bulan: number, 
      hari: number
    },
    remisi: {
      bulan: number,
      hari: number
    }
  },
  result: Date
}) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text>Laporan Pembebasan Bersyarat</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.label}>Tanggal Penahanan:</Text>
        <Text style={styles.value}>{new Date(data.tglPenahanan).toLocaleDateString('id-ID')}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.label}>Masa Pidana:</Text>
        <Text style={styles.value}>{data.masaPidana.tahun} Tahun, {data.masaPidana.bulan} Bulan, {data.masaPidana.hari} Hari</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.label}>Tanggal Pembebasan:</Text>
        <Text style={styles.value}>{result.toLocaleDateString('id-ID')}</Text>
      </View>
    </Page>
  </Document>
);