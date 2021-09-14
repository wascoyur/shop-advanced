import { Document, Font, Page, StyleSheet, Text } from '@react-pdf/renderer';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from '@david.kucsai/react-pdf-table';
import React from 'react';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

const Invoice = ({ order }) => {
  // console.log('Invoice order:', order);
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          ~ {new Date().toLocaleString()} ~
        </Text>
        <Text style={styles.title}>Order Invoices</Text>
        <Text style={styles.author}>author: @wascoyur</Text>
        <Text style={styles.page}>Сумма оплаченная</Text>

        <Table>
          <TableHeader>
            <TableCell>Название</TableCell>
            <TableCell>Цена, руб</TableCell>
            <TableCell>Количество</TableCell>
            <TableCell>Бренд</TableCell>
            <TableCell>Цвет</TableCell>
          </TableHeader>
        </Table>

        <Table data={order.products}>
          <TableBody>
            <DataTableCell getContent={(x) => x.product.title} />
            <DataTableCell
              getContent={(x) =>
                x.product.price.toLocaleString('ru-Ru', {
                  style: 'currency',
                  currency: 'RUB',
                })
              }
            />
            <DataTableCell getContent={(x) => x.count} />
            <DataTableCell getContent={(x) => x.product.brand} />
            <DataTableCell getContent={(x) => x.product.color} />
          </TableBody>
        </Table>
        <Text style={styles.text}>
          <Text>
            Дата:{' '}
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </Text>
          <Text>Номер платежного документа: {order.paymentIntent.id}</Text>
          <Text>Статус платежного документа: {order.status}</Text>
          <Text>Предъявлено к оплате: {order.paymentIntent.amount}</Text>
        </Text>
        <Text style={styles.footer}>Спасибо за покупку</Text>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: 'Roboto',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Roboto',
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Roboto',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Roboto',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
    fontFamily: 'Roboto',
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'Roboto',
  },
  footer: {
    padding: '100px',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'Roboto',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'Roboto',
  },
});
export default Invoice;
