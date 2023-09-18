import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TabsHeadline from "../../Components/TabsHeadline/TabsHeadline";
import AddTabsContent from "../../Components/TabsContent/AddTabsContent/AddTabsContent";
import StockTabsContent from "../../Components/TabsContent/StockTabsContent/StockTabsContent";
import SellTabsContent from "../../Components/TabsContent/SellTabsContent/SellTabsContent";

const Store = () => {
  return (
    <div className="bg-blue-100">
      <div className="pt-6 lg:pt-2">
        <Tabs>
          <div className="text-center">
            <TabList>
              <Tab>
                <TabsHeadline headline="Add" />
              </Tab>
              <Tab>
                <TabsHeadline headline="Stock" />
              </Tab>
              <Tab>
                <TabsHeadline headline="Sell" />
              </Tab>
              <Tab>
                <TabsHeadline headline="Purchase" />
              </Tab>
            </TabList>
          </div>

          {/* content */}
          <TabPanel>
            <AddTabsContent />
          </TabPanel>
          <TabPanel>
            <StockTabsContent />
          </TabPanel>
          <TabPanel>
            <SellTabsContent />
          </TabPanel>
          <TabPanel>
            <SellTabsContent />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Store;
