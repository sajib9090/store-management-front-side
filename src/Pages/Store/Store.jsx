import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TabsHeadline from "../../Components/TabsHeadline/TabsHeadline";
import AddTabsContent from "../../Components/TabsContent/AddTabsContent/AddTabsContent";
import StockTabsContent from "../../Components/TabsContent/StockTabsContent/StockTabsContent";
import SellTabsContent from "../../Components/TabsContent/SellTabsContent/SellTabsContent";
import { Link } from "react-router-dom";

const Store = () => {
  return (
    <div className="bg-blue-100">
      <div className="pt-6 lg:pt-2">
        <Tabs>
          <div className="text-center">
            <TabList>
              <Tab>
                <Link to="/store/add">
                  <TabsHeadline headline="Add" />
                </Link>
              </Tab>
              <Tab>
                <Link to="/store/stock">
                  <TabsHeadline headline="Stock" />
                </Link>
              </Tab>
              <Tab>
                <Link to="/store/sell">
                  <TabsHeadline headline="Sell" />
                </Link>
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
        </Tabs>
      </div>
    </div>
  );
};

export default Store;
