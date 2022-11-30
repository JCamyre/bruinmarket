import React from 'react'
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Stack
  } from '@chakra-ui/react'

function SideBar() {
    const [currOpen, setOpen] = React.useState(false)

    return (
        <div>
            <Button onClick={() => setOpen(true)} margin='1'>See Categories</Button>
            <Drawer isOpen={currOpen} onClose={() => setOpen(false)} placement={'left'} size='xs'> 
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader borderBottomWidth='1px'>Categories</DrawerHeader>
                    <DrawerBody>
                        <Stack>
                            <Button>Vehicles</Button>
                            <Button>Property Rentals</Button>
                            <Button>Apparel</Button>
                            <Button>Classifieds</Button>
                            <Button>Electronics</Button>
                            <Button>More Categories</Button>
                        </Stack>
                    </DrawerBody>   
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default SideBar;