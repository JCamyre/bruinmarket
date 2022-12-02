import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
} from "@chakra-ui/react";

function SideBar({ setCategory }) {
  const [currOpen, setOpen] = React.useState(false);

  const categories = [
    "All",
    "Books",
    "Cars",
    "Clothes",
    "Electronics",
    "Housing",
    "Music",
    "Sporting",
    "Toys",
    "Miscellaneous",
  ];

  return (
    <div>
      <Button onClick={() => setOpen(true)} margin="1" color='purple.300'>
        See Categories
      </Button>   
      <Drawer
        isOpen={currOpen}
        onClose={() => setOpen(false)}
        placement={"left"}
        size="xs"
      >
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Categories</DrawerHeader>
          <DrawerBody>
            <Stack>
              {categories.map((category, index) => (
                <Button
                  onClick={() => {
                    setOpen(false);
                    setCategory(category);
                  }}
                  key={index}
                >
                  {category}
                </Button>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default SideBar;
