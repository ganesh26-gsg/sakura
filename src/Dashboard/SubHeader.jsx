import * as HoverCard from '@radix-ui/react-hover-card';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import categories from '../store/categories';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const HoverCategory = ({ label, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <HoverCard.Root
      open={open}
      onOpenChange={setOpen}
      openDelay={100}
      closeDelay={100}
    >
      <HoverCard.Trigger asChild>
        <li className="cursor-pointer flex items-center gap-1 px-2 hover:text-pink-500 transition">
          <Link to={`/${label}`} className="flex items-center gap-1">
            {label}
            {open ? <FaChevronUp className="text-[12px]" /> : <FaChevronDown className="text-[12px]" />}
          </Link>
        </li>
      </HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content
          className="z-50 bg-white rounded-e-3xl shadow-xl p-2 text-sm min-w-[140px]"
          sideOffset={6}
        >
          {items.map((item, i) => (
            <Link
              key={i}
              to={
                item === 'mobiles' ? '/mobile' :
                item === 'laptops' ? '/laptop' :
                item === 'shirts' ? '/mensshirts' :
                item === 'watches' ? '/menswatches' :
                item === 'menshoes' ? '/mensshoes' :
                item === 'tops' ? '/tops' :
                item === 'womensshoes' ? '/womensshoes' :
                item === 'handbags' ? '/womensbags' :
                item === 'perfume' ? '/fragrances' :
                item === 'skincare' ? '/fragrances' :
                item === 'makeup' ? '/skincare' :
                item === 'earphones' ? '/earphones' :
                item === 'fruits' ? '/groceries' :
                item === 'snacks' ? '/groceries' :
                item === 'drinks' ? '/groceries' :
                item === 'sofa' ? '/furniture' :
                item === 'chairs' ? '/furniture' :
                item === 'tables' ? '/furniture' :
                item === 'fiction' ? '/furniture' :
                item === 'comics' ? '/furniture' :
                item === 'education' ? '/mobile' :
                item === 'split ac' ? '/laptop' :
                item === 'window ac' ? '/mobile' :
                item === 'smart ac' ? '/laptop' :
                `/${label}/${item}`
              }
              className="px-3 py-2.5 hover:bg-gray-500 rounded-e-2xl hover:text-white cursor-pointer block"
            >
              {item}
            </Link>
          ))}
          <HoverCard.Arrow className="fill-pink-600" />

        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

const SubHeader = () => (
  <div className="bg-white sticky top-20 z-40 mx-4">
    <div className="h-px bg-gray-200 mb-2 ml-24 mr-24"></div>

    <div className="max-w-4xl mx-auto px-4">
      <ul className="flex gap-4 sm:justify-start overflow-x-auto whitespace-nowrap text-sm sm:text-base font-medium text-gray-700 py-2">
        {categories.map((cat, i) => (
          <HoverCategory key={i} label={cat.label} items={cat.items} />
        ))}
      </ul>
    </div>

    <div className="h-px bg-gray-200 mt-1 ml-24 mr-24"></div>
  </div>
);

export default SubHeader;
