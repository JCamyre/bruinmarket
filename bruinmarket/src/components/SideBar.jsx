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

function SideBar({setCategory}) {
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
                            <Button onClick={() => {setOpen(false); setCategory("Books");}}>Books</Button>
                            <Button onClick={() => {setOpen(false); setCategory("Cars");}}>Cars</Button>
                            <Button onClick={() => {setOpen(false); setCategory("clothes");}}>Clothes</Button>
                            <Button onClick={() => {setOpen(false); setCategory("electronics");}}>Electronics</Button>
                            <Button onClick={() => {setOpen(false); setCategory("housing");}}>Housing</Button>
                            <Button onClick={() => {setOpen(false); setCategory("music");}}>Music</Button>
                            <Button onClick={() => {setOpen(false); setCategory("sporting");}}>Sporting</Button>
                            <Button onClick={() => {setOpen(false); setCategory("toys");}}>Toys</Button>
                            <Button onClick={() => {setOpen(false); setCategory("miscellaneous");}}>Miscellaneous</Button>
                        </Stack>
                    </DrawerBody>   
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default SideBar;