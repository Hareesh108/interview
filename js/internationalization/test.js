const price = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

console.log(price.format(5.259))
console.log(price.formatToParts(5.259))
console.log(price.formatRange(5.259,10))
console.log(price.formatRangeToParts(5.259,15))

console.log();

const locale1 = new Intl.Locale("en-US");
const locale2 = new Intl.Locale("en-Latn-US");

console.log(locale1.baseName);
console.log(locale1.language);
console.log(locale1.region);
console.log(locale1.script);

console.log(locale2.baseName);
console.log(locale2.language);
console.log(locale2.region);
console.log(locale2.script);

console.log();


const df1 = new Intl.DateTimeFormat("en-US-u-ca-hebrew");
const df2 = new Intl.DateTimeFormat("en-US", { calendar: "hebrew" });

console.log(df1);
console.log(df2);

