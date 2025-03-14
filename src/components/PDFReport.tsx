import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 600 }
  ]
});

const styles = StyleSheet.create({
  page: { 
    padding: 40,
    fontFamily: 'Inter'
  },
  headerContainer: {
    marginBottom: 30,
    borderBottom: '2px solid #E5E7EB',
    paddingBottom: 20
  },
  headerTitle: { 
    fontSize: 24, 
    marginBottom: 8,
    color: '#1F2937',
    fontWeight: 600
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280'
  },
  mainContent: {
    marginBottom: 30
  },
  section: { 
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8
  },
  sectionTitle: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
    fontWeight: 600
  },
  label: { 
    fontSize: 12, 
    color: '#6B7280',
    marginBottom: 4
  },
  value: { 
    fontSize: 14,
    color: '#1F2937'
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    borderTop: '1px solid #E5E7EB',
    paddingTop: 20,
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center'
  }
});


export const PDFReport = ({ data, result }: { 
  data: { 
    namaNapi: string,
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
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Laporan Pembebasan Bersyarat</Text>
        <Text style={styles.headerSubtitle}>Dokumen ini berisi informasi perhitungan pembebasan bersyarat berdasarkan ketentuan 2/3 masa pidana</Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data WBP</Text>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <Text style={styles.value}>{data.namaNapi}</Text>
          </View>
          <View>
            <Text style={styles.label}>Tanggal Penahanan</Text>
            <Text style={styles.value}>
              {new Date(data.tglPenahanan).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Pidana</Text>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.label}>Masa Pidana</Text>
            <Text style={styles.value}>
              {data.masaPidana.tahun} Tahun {data.masaPidana.bulan} Bulan {data.masaPidana.hari > 0 ? `${data.masaPidana.hari} Hari` : ''}
            </Text>
          </View>
          <View>
            <Text style={styles.label}>Remisi</Text>
            <Text style={styles.value}>
              {data.remisi.bulan} Bulan {data.remisi.hari > 0 ? `${data.remisi.hari} Hari` : ''}
            </Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: '#EFF6FF', borderLeft: '4px solid #3B82F6' }]}>
          <Text style={[styles.sectionTitle, { color: '#1E40AF' }]}>Tanggal Potensi Pembebasan</Text>
          <Text style={[styles.value, { color: '#1E40AF', fontSize: 16, fontWeight: 600 }]}>
            {new Date(result).toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Dokumen ini digenerate secara otomatis oleh sistem • {new Date().toLocaleDateString('id-ID')}</Text>
      </View>
    </Page>
  </Document>
);