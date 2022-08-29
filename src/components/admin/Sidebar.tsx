import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

export const SidebarAdmin = () => {
    const [visibleLeft, setVisibleLeft] = useState(false);
    
     return (
        <div>
            <div className="card">
                <Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}>
                    <h3>Products</h3>
                </Sidebar>
              
                <Button icon="pi pi-arrow-right" onClick={() => setVisibleLeft(true)} className="mr-2" />
             
            </div>
        </div>
    )
}