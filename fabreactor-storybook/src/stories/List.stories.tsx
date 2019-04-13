import * as React from "react";

import { storiesOf } from "@storybook/react";
import FabreactorProvider from 'fabreactor-faker/build/lib/faker/Provider';
import './List.module.css';
import { FabreactorList } from "fabreactor/build/lib";

const storeFaker = new FabreactorProvider(2000, 200);
const smallPageFaker = new FabreactorProvider(10, 1);

(storiesOf("Components/List", module) as any)
    .addWithJSX(
        "NL",
        (() => (
            <FabreactorList key={"1"} views={storeFaker.views} onGetView={storeFaker.onGetView} language={"nl-NL"} onNewItem={storeFaker.onNewItem}
                onAddItem={storeFaker.onAddItem}
                onDeleteItem={storeFaker.onDeleteItem} onSearch={storeFaker.onSearch} itemProperties={storeFaker.itemProperties} />
        ))
    )
    .addWithJSX(
        "Small pagesize",
        (() => (
            <FabreactorList key={"2"} views={smallPageFaker.views} onGetView={smallPageFaker.onGetView} onNewItem={storeFaker.onNewItem}
                onAddItem={storeFaker.onAddItem}
                onDeleteItem={smallPageFaker.onDeleteItem} itemProperties={smallPageFaker.itemProperties} />
        ))
    );

