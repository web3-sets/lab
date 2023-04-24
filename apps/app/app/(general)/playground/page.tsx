import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ViewRuntimeEngine } from '@/components/view-runtime-engine'
import { ViewValidateSet } from '@/components/view-validate-set'

export default function PagePlayround() {
  return (
    <>
      <section>
        <div className="container">
          <Tabs defaultValue="validation" className="w-full">
            <TabsList className="w-full p-4">
              <TabsTrigger className="w-1/2 py-3" value="validation">
                Schema Validation
              </TabsTrigger>
              <TabsTrigger className="w-1/2 py-3" value="engine">
                Runtime Engine
              </TabsTrigger>
            </TabsList>
            <TabsContent value="validation">
              <ViewValidateSet />
            </TabsContent>
            <TabsContent value="engine">
              <ViewRuntimeEngine />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}
