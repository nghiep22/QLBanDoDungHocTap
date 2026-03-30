export function formatMoney(amount: number, currency: string = 'đ'): string {
  return `${amount.toLocaleString('vi-VN')} ${currency}`;
}

export function formatMoneyShort(amount: number): string {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)}B`;
  }
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K`;
  }
  return amount.toString();
}

export function parseMoney(value: string): number {
  return Number(value.replace(/[^0-9.-]+/g, ''));
}
