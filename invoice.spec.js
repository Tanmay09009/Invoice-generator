import { addItem, calculateTotals, generateInvoice } from '../src/js/invoice.js';

describe('Invoice Generation', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <input type="text" id="customerName" value="John Doe">
        <textarea id="customerAddress">123 Main St</textarea>
        <table id="itemsTable">
          <tbody></tbody>
        </table>
        <input type="number" id="taxRate" value="10">
        <button id="addItemBtn">Add Item</button>
        <button id="generateInvoiceBtn">Generate Invoice</button>
        <div class="invoice" id="invoicePreview" style="display:none;">
          <table id="invoiceTable">
            <tbody></tbody>
          </table>
          <table class="summary">
            <tr><td>Subtotal</td><td id="subTotal">0</td></tr>
            <tr><td>Tax</td><td id="tax">0</td></tr>
            <tr><td>Grand Total</td><td id="grandTotal">0</td></tr>
          </table>
        </div>
      </div>
    `;
  });

  test('should add an item to the invoice', () => {
    const addItemBtn = document.getElementById('addItemBtn');
    addItemBtn.onclick = addItem;

    addItemBtn.click();
    const rows = document.querySelectorAll('#itemsTable tbody tr');
    expect(rows.length).toBe(1);
  });

  test('should calculate totals correctly', () => {
    const itemRow = `
      <tr>
        <td><input type="text" value="Item 1"></td>
        <td><input type="number" value="2"></td>
        <td><input type="number" value="50"></td>
        <td class="rowTotal">0</td>
      </tr>
    `;
    document.querySelector('#itemsTable tbody').innerHTML += itemRow;

    calculateTotals();

    expect(document.getElementById('subTotal').innerText).toBe('100.00');
    expect(document.getElementById('tax').innerText).toBe('10.00');
    expect(document.getElementById('grandTotal').innerText).toBe('110.00');
  });

  test('should generate invoice correctly', () => {
    const itemRow = `
      <tr>
        <td><input type="text" value="Item 1"></td>
        <td><input type="number" value="2"></td>
        <td><input type="number" value="50"></td>
        <td class="rowTotal">0</td>
      </tr>
    `;
    document.querySelector('#itemsTable tbody').innerHTML += itemRow;

    generateInvoice();

    expect(document.getElementById('invoicePreview').style.display).toBe('block');
    expect(document.querySelector('#invoiceTable tbody tr').children[1].innerText).toBe('Item 1');
  });
});