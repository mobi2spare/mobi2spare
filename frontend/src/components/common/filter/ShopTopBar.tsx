import Text from '../../ui/text';
import ListBox from '../../ui/ListBox';

export default function SearchTopBar() {
  return (
    <div className="flex justify-between items-center mb-7">
      <Text variant="pageHeading" className="hidden lg:inline-flex pb-1">
        Products
      </Text>
      <div className="flex items-center justify-end">
        <div className="flex-shrink-0 text-body text-xs md:text-sm leading-4 ltr:pr-4 rtl:pl-4 ltr:md:mr-6 rtl:md:ml-6 ltr:pl-2 rtl:pr-2 hidden lg:block">
         10 items
        </div>
        <ListBox
          options={[
            { name: 'text-sorting-options', value: 'Select option' },
            { name: 'text-newest', value: 'Newest' },
            { name: 'text-price-low-high', value: 'Low-High price' },
            { name: 'text-price-high-low', value: 'High-Low price' },
          ]}
        />
      </div>
    </div>
  );
}
