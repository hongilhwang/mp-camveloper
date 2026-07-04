import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import ErrorBoundary from '@/components/ErrorBoundary'
import Home from '@/pages/Home'
import Browse from '@/pages/Browse'
import HarnessDetail from '@/pages/HarnessDetail'
import ItemDetail from '@/pages/ItemDetail'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <main>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/harness/:harnessId" element={<HarnessDetail />} />
              <Route path="/harness/:harnessId/skill/:skillId" element={<ItemDetail itemType="skill" />} />
              <Route path="/harness/:harnessId/agent/:agentId" element={<ItemDetail itemType="agent" />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </HashRouter>
  )
}
