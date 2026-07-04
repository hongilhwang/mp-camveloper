import matter from 'gray-matter'

// registry.json 직접 import
import registry from '../../../registry.json'

export type RegistrySkill = {
  id: string
  path: string
  description: string
}

export type RegistryAgent = {
  id: string
  path: string
  description: string
}

export type RegistryHarness = {
  id: string
  namespace: string
  version: string
  description: string
  author: string
  path: string
  skills: RegistrySkill[]
  agents: RegistryAgent[]
}

export type ParsedItem = {
  id: string
  frontmatter: Record<string, unknown>
  content: string
  raw: string
}

// harnesses 하위 .md 파일을 빌드 타임에 eager 로딩
const mdModules = import.meta.glob('../../../harnesses/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function loadMd(relativePath: string): ParsedItem | null {
  // registry.json의 경로는 repo root 기준 (./harnesses/...)
  // glob key는 ui/src/lib 기준 상대경로 (../../../harnesses/...)
  const key = relativePath.replace(/^\.\//, '../../../')
  const raw = mdModules[key]
  if (!raw) return null
  const { data, content } = matter(raw)
  return { id: '', frontmatter: data, content, raw }
}

export function getRegistry() {
  return registry
}

export function getHarnesses(): RegistryHarness[] {
  return registry.harnesses as RegistryHarness[]
}

export function getHarness(id: string): (RegistryHarness & { parsed: ParsedItem | null }) | null {
  const harness = (registry.harnesses as RegistryHarness[]).find((h) => h.id === id)
  if (!harness) return null
  return { ...harness, parsed: loadMd(harness.path) }
}

export function getSkill(harnessId: string, skillId: string) {
  const harness = (registry.harnesses as RegistryHarness[]).find((h) => h.id === harnessId)
  if (!harness) return null
  const skill = harness.skills.find((s) => s.id === skillId)
  if (!skill) return null
  return { ...skill, harness, parsed: loadMd(skill.path) }
}

export function getAgent(harnessId: string, agentId: string) {
  const harness = (registry.harnesses as RegistryHarness[]).find((h) => h.id === harnessId)
  if (!harness) return null
  const agent = harness.agents.find((a) => a.id === agentId)
  if (!agent) return null
  return { ...agent, harness, parsed: loadMd(agent.path) }
}

export function getAllSkills() {
  return (registry.harnesses as RegistryHarness[]).flatMap((h) =>
    h.skills.map((s) => ({ ...s, harness: h }))
  )
}

export function getAllAgents() {
  return (registry.harnesses as RegistryHarness[]).flatMap((h) =>
    h.agents.map((a) => ({ ...a, harness: h }))
  )
}
