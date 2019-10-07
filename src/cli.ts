import meow from 'meow';
import {
  DEFAULT_CLIP,
  DEFAULT_SIZE,
  DEFAULT_COPIES,
  DEFAULT_TOLERANCE,
} from 'node-stego/lib/constant';
import {
  normalizeFlags,
  flags2Options,
  validateFlags,
} from 'node-stego/lib/flag';
import { GrayscaleAlgorithm } from 'node-stego/lib/grayscale';
import { TransformAlgorithm } from 'node-stego/lib/transform';
import {
  normalizeFlags as normalizeFlagsE2E,
  flags2Options as flags2OptionsE2E,
  validateFlags as validateFlagsE2E,
} from './flag';
import { generateSuite, validateSuite } from '.';

const CLI_NAME = 'e2e';

const cli = meow(
  `Usage
  $ ${CLI_NAME} [options...]

Options
  -h, --help       Print help message
  -v, --version    Print version message
  -c, --create     Create suites from image database
  -d, --validate   Validate suites and update status for each one

FB Options
  -n, --name       FB account name
  -p, --pass       FB account password

Stego Options
  -s, --size       Size of encoding block with radix-2 required: ${DEFAULT_SIZE} (default).
  -c, --copies     Encode duplicate messages in order to survive from
                   compression attack with odd numbers required: ${DEFAULT_COPIES} (default).
  -t, --tolerance  The robustness level to compression: ${DEFAULT_TOLERANCE} (default).
  -g, --grayscale  Specify grayscale algorithm: 'NONE' (default), 'AVG',
                   'LUMA', 'LUMA_II', 'DESATURATION', 'MAX_DE',
                   'MIN_DE', 'MID_DE', 'R', 'G', 'B'.
  -f, --transform  Specify transform algorithm: 'FFT1D' (default), 'FFT2D',
                   'DCT'.

Examples
  $ ${CLI_NAME} -c # create test suites
  $ ${CLI_NAME} -v # validate test suites
`,
  {
    flags: {
      help: {
        type: 'boolean',
        default: false,
        alias: 'h',
      },
      version: {
        type: 'boolean',
        default: false,
        alias: 'v',
      },
      generate: {
        type: 'boolean',
        default: false,
      },
      validate: {
        type: 'boolean',
        default: false,
      },
      name: {
        type: 'string',
        default: '',
        alias: 'n',
      },
      pass: {
        type: 'string',
        default: '',
        alias: 'p',
      },
      clip: {
        type: 'string',
        default: DEFAULT_CLIP,
        alias: 'i',
      },
      size: {
        type: 'string',
        default: DEFAULT_SIZE,
        alias: 's',
      },
      copies: {
        type: 'string',
        default: DEFAULT_COPIES,
        alias: 'c',
      },
      tolerance: {
        type: 'string',
        default: DEFAULT_TOLERANCE,
        alias: 't',
      },
      grayscale: {
        type: 'string',
        default: GrayscaleAlgorithm.NONE,
        alias: 'g',
      },
      transform: {
        type: 'string',
        default: TransformAlgorithm.FFT1D,
        alias: 'f',
      },
    },
    inferType: true,
  }
);

export async function run() {
  const stegoFlags = normalizeFlags(cli.flags);
  const e2eFlags = normalizeFlagsE2E(cli.flags);

  if (stegoFlags.help || (!e2eFlags.generate && !e2eFlags.validate)) {
    process.stdout.write(cli.help);
    process.exit(0);
  } else if (stegoFlags.version) {
    process.stdout.write(`${version}\n`);
    process.exit(0);
  }

  const errMsg = validateFlags(stegoFlags) || validateFlagsE2E(e2eFlags);

  if (errMsg) {
    process.stderr.write(`${errMsg}\n`);
    process.exit(1);
  }

  const stegoOptions = flags2Options(stegoFlags);
  const e2eOptions = flags2OptionsE2E(e2eFlags);

  if (e2eFlags.generate) {
    generateSuite(e2eOptions, stegoOptions);
  } else if (e2eFlags.validate) {
    validateSuite(stegoOptions);
  }
}

export const version = process.env.npm_package_version;
