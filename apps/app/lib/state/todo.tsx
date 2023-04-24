import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'

const todoFamily = atomFamily((name) => atom(name))

todoFamily('foo')
