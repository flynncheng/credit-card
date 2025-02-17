import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import HomeRecordsTrans from "./HomeRecordsTrans";
import HomeRecordsTopup from "./HomeRecordsTopup";

export default function HomeRecords() {
  return (
    <Tabs defaultValue="account">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Transactions</TabsTrigger>
        <TabsTrigger value="password">Topup</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <HomeRecordsTrans />
      </TabsContent>
      <TabsContent value="password">
        <HomeRecordsTopup />
      </TabsContent>
    </Tabs>
  );
}
